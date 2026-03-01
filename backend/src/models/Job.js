const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: String,
  eligibility: String,
  location: String,
  salary: String,
  type: {
    type: String,
    enum: ['Full-time', 'Internship', 'Part-time'],
    default: 'Full-time'
  },
  applications: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Rejected'],
      default: 'Applied'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);
