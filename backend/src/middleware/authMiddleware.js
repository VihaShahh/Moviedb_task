const jwt = require("jsonwebtoken");

//authorization middleware logic
exports.authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    token = token.startsWith("Bearer ") ? token.slice(7) : token; 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token." });
    }
};
