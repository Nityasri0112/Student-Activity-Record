const User = require('../models/User');
const Activity = require('../models/Activity');
const Job = require('../models/Job');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const query = role ? { role } : {};
    
    const users = await User.find(query).select('-password').sort('-createdAt');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userResponse = await User.findById(user._id).select('-password');
    res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get system statistics
exports.getStats = async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      students: await User.countDocuments({ role: 'student' }),
      faculty: await User.countDocuments({ role: 'faculty' }),
      recruiters: await User.countDocuments({ role: 'recruiter' }),
      totalActivities: await Activity.countDocuments(),
      pendingApprovals: await Activity.countDocuments({ status: 'Pending' }),
      approvedActivities: await Activity.countDocuments({ status: 'Approved' }),
      totalJobs: await Job.countDocuments(),
      recentUsers: await User.find().select('name email role createdAt').sort('-createdAt').limit(5)
    };
    
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bulk upload users
exports.bulkUpload = async (req, res) => {
  try {
    const { users } = req.body;
    const createdUsers = await User.insertMany(users);
    
    res.status(201).json({ 
      success: true, 
      message: `${createdUsers.length} users created successfully`,
      data: createdUsers 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
