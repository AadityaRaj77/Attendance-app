const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: true
    },
    date: {
        type: Date,
        default: () => {
            const d = new Date();
            d.setUTCHours(0, 0, 0, 0);
            return d;
        }
    },
    markedAt: {
        type: Date,
        default: () => new Date()
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
