const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../controllers/authController');

router.use(protect);

router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.get('/stats', adminController.getStats);
router.post('/bulk-upload', adminController.bulkUpload);

module.exports = router;
