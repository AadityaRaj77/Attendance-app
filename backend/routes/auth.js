const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
        return res.status(400).json({ msg: "Invalid credentials" });

    if (user.role === "admin") {
        if (password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ msg: "Incorrect admin password" });
        }
    }
    else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
    );
    res.json({
        token,
        user: {
            id: user._id,
            username: user.username,
            role: user.role
        }
    });
});

module.exports = router;


