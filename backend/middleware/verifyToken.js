const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ msg: "No token provided" });

    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Malformed token" });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role }
        next();
    } catch {
        res.status(401).json({ msg: "Invalid or expired token" });
    }
};
