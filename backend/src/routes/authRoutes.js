const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/reset-password-direct', authController.resetPasswordDirect);
router.get('/me', authController.protect, authController.getMe);

// Debug route to see all users
router.get('/users', async (req, res) => {
  const users = await require('../models/User').find().select('-password');
  res.json(users);
});

module.exports = router;
