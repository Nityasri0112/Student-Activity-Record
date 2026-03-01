const Activity = require('../models/Activity');
const User = require('../models/User');

// Get pending approvals
exports.getPendingApprovals = async (req, res) => {
  try {
    const activities = await Activity.find({ status: 'Pending' })
      .populate('student', 'name rollNo department')
      .sort('-createdAt');
    
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve activity
exports.approveActivity = async (req, res) => {
  try {
    const { credits, comment } = req.body;
    
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Approved',
        reviewedBy: req.user.id,
        reviewComment: comment,
        credits: credits || 0
      },
      { new: true }
    );
    
    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject activity
exports.rejectActivity = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Rejected',
        reviewedBy: req.user.id,
        reviewComment: reason
      },
      { new: true }
    );
    
    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all students for monitoring
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort('name');
    
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student details with activities
exports.getStudentDetails = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    const activities = await Activity.find({ student: req.params.id });
    
    res.json({ 
      success: true, 
      data: { 
        student, 
        activities,
        stats: {
          total: activities.length,
          approved: activities.filter(a => a.status === 'Approved').length,
          pending: activities.filter(a => a.status === 'Pending').length,
          totalCredits: activities.reduce((sum, a) => sum + (a.credits || 0), 0)
        }
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
