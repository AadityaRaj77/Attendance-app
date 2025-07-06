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
router.get("/summary", verifyToken, async (req, res) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const present = await Attendance.countDocuments({ date: today, status: "present" });
    const total = await User.countDocuments();
    res.json({ present, total });
});
router.get("/", verifyToken, async (req, res) => {
    const { date } = req.query;
    const d = new Date(date); d.setHours(0, 0, 0, 0);
    const docs = await Attendance.find({ date: d }).populate("user", "username");
    res.json(docs);
});




module.exports = router;
