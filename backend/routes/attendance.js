const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance");
const verifyToken = require("../middleware/verifyToken");
const { Parser } = require("json2csv");


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

router.get("/export/me", verifyToken, async (req, res) => {
    const records = await Attendance.find({ user: req.user.id }).sort("date")
        .lean().populate("user", "username");
    const fields = ["user.username", "status", "date", "markedAt"];
    const csv = new Parser({ fields }).parse(records);

    res.header("Content-Type", "text/csv");
    res.attachment(`attendance_${req.user.id}.csv`);
    res.send(csv);
});

router.get("/export/all", verifyToken, async (req, res) => {
    if (req.user.role !== "admin")
        return res.status(403).json({ msg: "Forbidden" });

    const records = await Attendance.find().sort("date")
        .lean().populate("user", "username");
    const fields = ["user.username", "status", "date", "markedAt"];
    const csv = new Parser({ fields }).parse(records);

    res.header("Content-Type", "text/csv");
    res.attachment(`attendance_all.csv`);
    res.send(csv);
});



module.exports = router;
