const db = require('../config/db');
const ExcelJS = require('exceljs');

exports.getDashboardStats = async (req, res) => {
    try {
        // Sales roughly grouped for Chart.js
        const { rows: salesData } = await db.query(`
            SELECT TO_CHAR(created_at, 'YYYY-MM') as month, SUM(total_amount) as total
            FROM orders
            WHERE status != 'cancelled'
            GROUP BY month
            ORDER BY month ASC
        `);

        const { rows: lowStock } = await db.query(`
            SELECT id, name, stock_quantity, category 
            FROM products 
            WHERE stock_quantity < 10
            LIMIT 5
        `);

        const { rows: stats } = await db.query(`
            SELECT 
                COUNT(*) as total_orders,
                SUM(total_amount) as total_revenue,
                (SELECT COUNT(*) FROM users) as total_users,
                (SELECT SUM(savings) FROM (
                    SELECT (p.base_price - oi.price_at_purchase) * oi.quantity as savings
                    FROM order_items oi
                    JOIN products p ON oi.product_id = p.id
                    WHERE oi.price_at_purchase < p.base_price
                ) as s) as total_wholesale_savings
            FROM orders
            WHERE status != 'cancelled'
        `);

        res.json({
            success: true,
            data: {
                salesChart: salesData,
                lowStock,
                stats: {
                    totalOrders: parseInt(stats[0].total_orders) || 0,
                    totalRevenue: parseFloat(stats[0].total_revenue) || 0,
                    totalUsers: parseInt(stats[0].total_users) || 0,
                    wholesaleSavings: parseFloat(stats[0].total_wholesale_savings) || 0
                }
            }
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.exportOrders = async (req, res) => {
    try {
        const { rows: orders } = await db.query(`
            SELECT 
                o.id, 
                o.created_at, 
                o.status, 
                o.total_amount, 
                u.full_name, 
                u.email,
                o.shipping_city,
                o.shipping_address
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        `);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('TG Orders Master');

        // Styling for Luxury Branding
        const goldCell = {
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD4AF37' } },
            font: { color: { argb: 'FFFFFFFF' }, bold: true },
            alignment: { horizontal: 'center' }
        };

        // Columns
        worksheet.columns = [
            { header: 'ID COMMANDE', key: 'id', width: 15 },
            { header: 'DATE', key: 'date', width: 20 },
            { header: 'CLIENT', key: 'client', width: 25 },
            { header: 'EMAIL', key: 'email', width: 30 },
            { header: 'VILLE', key: 'city', width: 15 },
            { header: 'MONTANT (DA)', key: 'amount', width: 20 },
            { header: 'STATUT', key: 'status', width: 15 }
        ];

        // Apply Luxury Styling to Header
        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = goldCell.fill;
            cell.font = goldCell.font;
            cell.alignment = goldCell.alignment;
        });

        // Add Data
        orders.forEach(order => {
            worksheet.addRow({
                id: `#${order.id}`,
                date: new Date(order.created_at).toLocaleDateString('fr-FR'),
                client: order.full_name,
                email: order.email,
                city: order.shipping_city,
                amount: order.total_amount,
                status: order.status.toUpperCase()
            });
        });

        // Formatting Amount Column
        worksheet.getColumn('amount').numFmt = '#,##0.00 "DA"';

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=TG_Mobile_Orders_Export.xlsx');

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateProductWholesale = async (req, res) => {
    try {
        const { wholesale_enabled } = req.body;
        const { id } = req.params;

        await db.query('UPDATE products SET wholesale_enabled = $1 WHERE id = $2', [wholesale_enabled, id]);
        res.json({ success: true, message: 'Wholesale status updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateOrderState = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        await db.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);
        res.json({ success: true, message: 'Order status updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.uploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No images uploaded' });
        }
        
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        res.status(200).json({ success: true, urls: imageUrls });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
