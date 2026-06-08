const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.get('/stats', protect, admin, adminController.getDashboardStats);
router.get('/export-orders', protect, admin, adminController.exportOrders);
router.put('/product/:id/wholesale', protect, admin, adminController.updateProductWholesale);
router.put('/order/:id/status', protect, admin, adminController.updateOrderState);
router.post('/upload', protect, admin, upload.array('images', 5), adminController.uploadImages);

module.exports = router;
