const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../models/user");

async function seed() {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, useUnifiedTopology: true
    });

    await User.deleteMany();
    const users = [
        { username: "admin1", role: "admin" },
        {
            username: "student1",
            password: await bcrypt.hash("123456", 10),
            role: "user"
        },
        {
            username: "student2",
            password: await bcrypt.hash("hello123", 10),
            role: "user"
        }
    ];

    await User.insertMany(users);
    console.log("Seed complete");
    process.exit();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
