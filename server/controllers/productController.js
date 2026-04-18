const db = require('../config/db');

exports.getProducts = async (req, res) => {
    try {
        const { search, category, limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;

        let query = `
            SELECT p.*, c.name as category_name, i.image_url 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN product_images i ON p.id = i.product_id AND i.is_primary = TRUE
            WHERE p.is_active = TRUE
        `;
        const params = [];

        if (search) {
            params.push(`%${search}%`);
            query += ` AND p.name ILIKE $${params.length}`;
        }

        if (category) {
            params.push(category);
            query += ` AND c.slug = $${params.length}`;
        }

        params.push(parseInt(limit));
        query += ` LIMIT $${params.length}`;
        
        params.push(parseInt(offset));
        query += ` OFFSET $${params.length}`;

        const [products] = await db.execute(query, params);
        
        // Let's also fetch pricing tiers to pass along with the product
        for (let prod of products) {
            const [tiers] = await db.execute(`SELECT * FROM bulk_pricing_tiers WHERE product_id = $1 ORDER BY min_quantity ASC`, [prod.id]);
            prod.bulk_tiers = tiers;
        }

        res.json({ success: true, count: products.length, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        const productId = req.params.id;
        
        const [productData] = await db.execute(`
            SELECT p.*, c.name as category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = $1
        `, [productId]);

        if (productData.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        const product = productData[0];

        const [images] = await db.execute(`SELECT * FROM product_images WHERE product_id = $1`, [productId]);
        const [tiers] = await db.execute(`SELECT * FROM bulk_pricing_tiers WHERE product_id = $1 ORDER BY min_quantity ASC`, [productId]);

        res.json({
            success: true,
            data: {
                ...product,
                images,
                bulk_tiers: tiers
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.calculateBulkPrice = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        if (!productId || quantity === undefined) {
             return res.status(400).json({ success: false, message: 'productId and quantity are required' });
        }

        const [productData] = await db.execute('SELECT base_price, wholesale_enabled FROM products WHERE id = $1', [productId]);
        if (productData.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });
        
        const product = productData[0];
        let finalPrice = parseFloat(product.base_price);
        let appliedTier = null;

        if (product.wholesale_enabled) {
            const [tiers] = await db.execute(`
                SELECT * FROM bulk_pricing_tiers 
                WHERE product_id = $1 
                AND min_quantity <= $2 
                AND (max_quantity IS NULL OR max_quantity >= $3)
                ORDER BY min_quantity DESC LIMIT 1
            `, [productId, quantity, quantity]);

            if (tiers.length > 0) {
                finalPrice = parseFloat(tiers[0].price_per_unit);
                appliedTier = tiers[0];
            }
        }

        const total = finalPrice * quantity;
        const discount = (parseFloat(product.base_price) - finalPrice) * quantity;

        res.json({
            success: true,
            data: {
                unitPrice: finalPrice,
                totalPrice: total,
                discountSaved: discount,
                appliedTier
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
