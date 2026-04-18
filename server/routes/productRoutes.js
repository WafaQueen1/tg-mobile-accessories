const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products
router.get('/', productController.getProducts);

// POST /api/products/calculate-price
router.post('/calculate-price', productController.calculateBulkPrice);

// GET /api/products/:slug
router.get('/:id', productController.getProductDetails);

module.exports = router;
