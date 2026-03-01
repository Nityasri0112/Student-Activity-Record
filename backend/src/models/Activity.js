const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Workshop', 'Conference', 'MOOC', 'Certification', 'Club Activity', 'Internship', 'Volunteering', 'Competition', 'Leadership'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  level: {
    type: String,
    enum: ['Department', 'College', 'State', 'National', 'International']
  },
  description: String,
  certificateUrl: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  correctionRequest: String,
  reviewComment: String,
  credits: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', activitySchema);
