const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const Attendance = require('./models/attendance');
const User = require('./models/user');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
    startAutoAbsentCron();
}).catch((err) => {
    console.error(" MongoDB connect error:", err);
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/attendance", require("./routes/attendance"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


function startAutoAbsentCron() {
    cron.schedule("59 23 * * *", async () => {
        try {
            console.log("Running auto-absent task…");

            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            const tomorrowStart = new Date(todayStart);
            tomorrowStart.setDate(tomorrowStart.getDate() + 1);

            const markedPresentUsers = await Attendance
                .find({
                    date: { $gte: todayStart, $lt: tomorrowStart },
                    status: "present"
                })
                .distinct("user");

            const allUsers = await User.find().select("_id");

            const toMark = allUsers
                .map(u => u._id.toString())
                .filter(id => !markedPresentUsers.includes(id));

            if (toMark.length > 0) {
                const docs = toMark.map(userId => ({
                    user: userId,
                    status: "absent",
                    date: todayStart,
                    markedAt: new Date()
                }));
                await Attendance.insertMany(docs);
                console.log(`Auto-absent marked for ${docs.length} users.`);
            }
            else {
                console.log("All users already marked; no auto-absent needed.");
            }
        } catch (err) {
            console.error("Auto-absent task failed:", err);
        }
    });

    console.log("Cron job scheduled");
}