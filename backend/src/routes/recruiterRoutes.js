const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const { protect } = require('../controllers/authController');

router.use(protect);

router.get('/students', recruiterController.getVerifiedStudents);
router.get('/students/:id/portfolio', recruiterController.getStudentPortfolio);
router.post('/jobs', recruiterController.postJob);
router.get('/jobs', recruiterController.getMyJobs);
router.put('/jobs/:jobId/applications/:applicationId/shortlist', recruiterController.shortlistCandidate);
router.put('/jobs/:id', recruiterController.updateJob);
router.delete('/jobs/:id', recruiterController.deleteJob);

module.exports = router;
