const Attendance = require('./models/attendance.js');

exports.markAttendance = async (req, res) => {
    const { userId, date, status } = req.body;
    try {
        const record = await Attendance.findOneAndUpdate(
            { user: userId, date },
            { status },
            { upsert: true, new: true }
        );
        return res.json(record);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getUserAttendance = async (req, res) => {
    try {
        const records = await Attendance.find({ user: req.params.userId })
            .sort('-date');
        return res.json(records);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getTodaySummary = async (req, res) => {
    const todayStart = new Date().setHours(0, 0, 0, 0);
    try {
        const present = await Attendance.countDocuments({
            date: todayStart,
            status: 'present'
        });
        const total = await require('../models/user').countDocuments();
        return res.json({ present, total });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
