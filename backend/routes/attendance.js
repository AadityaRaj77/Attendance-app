const express = require('express');
const router = express.Router();
const {
    markAttendance,
    getUserAttendance,
    getTodaySummary
} = require('../controllers/attendanceController');

router.post('/mark', markAttendance);
router.get('/user/:userId', getUserAttendance);
router.get('/today-summary', getTodaySummary);

module.exports = router;
