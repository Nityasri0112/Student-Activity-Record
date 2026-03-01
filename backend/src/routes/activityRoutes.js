const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const { protect } = require('../controllers/authController');

// Get all activities
router.get('/', async (req, res) => {
  try {
    const { status, student } = req.query;
    let query = {};
    if (status) query.status = status;
    if (student) query.student = student;
    
    const activities = await Activity.find(query)
      .populate('student', 'name rollNo')
      .populate('reviewedBy', 'name')
      .sort('-createdAt');
    
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get activity by ID
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('student', 'name rollNo department')
      .populate('reviewedBy', 'name');
    
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    
    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
