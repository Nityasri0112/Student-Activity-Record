const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect } = require('../controllers/authController');

router.get('/profile', protect, studentController.getProfile);
router.put('/profile', protect, studentController.updateProfile);
router.get('/activities', protect, studentController.getActivities);
router.post('/activities', protect, studentController.uploadActivity);
router.put('/activities/:id', protect, studentController.updateActivity);
router.put('/activities/:id/request-correction', protect, studentController.requestCorrection);
router.delete('/activities/:id', protect, studentController.deleteActivity);

module.exports = router;
