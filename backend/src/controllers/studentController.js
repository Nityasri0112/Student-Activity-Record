const User = require('../models/User');
const Activity = require('../models/Activity');

// Get student profile
exports.getProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id).select('-password');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json(student); // Return profile data directly for frontend
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update student profile
exports.updateProfile = async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    
    res.json(student); // Return profile data directly for frontend
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ student: req.user.id })
      .populate('reviewedBy', 'name')
      .sort('-createdAt');
    
    res.json({ success: true, activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload activity
exports.uploadActivity = async (req, res) => {
  try {
    const activity = await Activity.create({
      ...req.body,
      student: req.user.id
    });
    
    res.status(201).json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update activity
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, student: req.user.id },
      req.body,
      { new: true }
    );
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete activity
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({
      _id: req.params.id,
      student: req.user.id
    });
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Request correction for rejected activity
exports.requestCorrection = async (req, res) => {
  try {
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, student: req.user.id },
      { 
        status: 'Pending',
        correctionRequest: req.body.correctionRequest,
        reviewComment: null // Clear previous comment
      },
      { new: true }
    );
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
