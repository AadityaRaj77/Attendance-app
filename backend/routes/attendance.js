const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let record = await Attendance.findOne({ user: userId, date: today });
        if (record) {
            return res.status(400).json({ msg: "Already marked" });
        }
        record = new Attendance({ user: userId, status: req.body.status, date: today });
        await record.save();

        return res.json({ record });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: err.message });
    }
});

router.get("/me", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const records = await Attendance
            .find({ user: userId })
            .sort({ date: 1 });

        return res.json(records);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
