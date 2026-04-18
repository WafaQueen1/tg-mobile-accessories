const db = require('../config/db');

exports.getDashboardStats = async (req, res) => {
    try {
        // Sales roughly grouped for Chart.js
        const [salesData] = await db.execute(`
            SELECT TO_CHAR(created_at, 'YYYY-MM') as month, SUM(total_amount) as total
            FROM orders
            GROUP BY month
            ORDER BY month ASC
        `);

        const [lowStock] = await db.execute(`
            SELECT id, name, stock_quantity 
            FROM products 
            WHERE stock_quantity < 10
        `);

        const [ordersCount] = await db.execute('SELECT COUNT(*) as count FROM orders');
        const [revenue] = await db.execute('SELECT SUM(total_amount) as rev FROM orders WHERE status != "cancelled"');

        res.json({
            success: true,
            data: {
                salesChart: salesData,
                lowStock,
                totalOrders: ordersCount[0].count,
                totalRevenue: revenue[0].rev || 0
            }
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateProductWholesale = async (req, res) => {
    try {
        const { wholesale_enabled } = req.body;
        const { id } = req.params;

        await db.execute('UPDATE products SET wholesale_enabled = $1 WHERE id = $2', [wholesale_enabled, id]);
        res.json({ success: true, message: 'Wholesale status updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateOrderState = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        await db.execute('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);
        res.json({ success: true, message: 'Order status updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Multer Upload Mock response
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
