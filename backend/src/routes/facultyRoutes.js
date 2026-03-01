const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const { protect } = require('../controllers/authController');

router.use(protect);

router.get('/pending-approvals', facultyController.getPendingApprovals);
router.put('/activities/:id/approve', facultyController.approveActivity);
router.put('/activities/:id/reject', facultyController.rejectActivity);
router.get('/students', facultyController.getStudents);
router.get('/students/:id', facultyController.getStudentDetails);

module.exports = router;
