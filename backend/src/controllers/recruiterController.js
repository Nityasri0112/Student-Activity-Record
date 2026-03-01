const User = require('../models/User');
const Job = require('../models/Job');
const Activity = require('../models/Activity');

// Get verified students
exports.getVerifiedStudents = async (req, res) => {
  try {
    const { minCGPA, skills, department } = req.query;
    
    let query = { role: 'student', isVerified: true };
    if (department) query.department = department;
    
    const students = await User.find(query).select('-password');
    
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student portfolio
exports.getStudentPortfolio = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    const activities = await Activity.find({ 
      student: req.params.id, 
      status: 'Approved' 
    });
    
    res.json({ success: true, data: { student, activities } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Post job
exports.postJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiter: req.user.id
    });
    
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get recruiter's jobs
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id })
      .populate('applications.student', 'name email rollNo')
      .sort('-createdAt');
    
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Shortlist candidate
exports.shortlistCandidate = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.jobId, 'applications._id': req.params.applicationId },
      { $set: { 'applications.$.status': 'Shortlisted' } },
      { new: true }
    );
    
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user.id },
      req.body,
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      recruiter: req.user.id
    });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
