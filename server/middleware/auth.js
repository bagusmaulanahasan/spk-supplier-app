// // middleware/auth.js
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET || "rahasia_super_secret";

// exports.verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader)
//         return res.status(401).json({ message: "Token tidak tersedia" });

//     const token = authHeader.split(" ")[1]; // format: "Bearer token"

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(403).json({ message: "Token tidak valid" });
//     }
// };

// exports.onlyManager = (req, res, next) => {
//     if (req.user.role !== "manager") {
//         return res.status(403).json({ message: "Akses hanya untuk manager" });
//     }
//     next();
// };

// exports.onlyAdmin = (req, res, next) => {
//     if (req.user.role !== "admin") {
//         return res.status(403).json({ message: "Akses hanya untuk admin" });
//     }
//     next();
// };

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "jdsofh0wr029839udf0w39ue0";

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err)
            return res
                .status(401)
                .json({ message: "Unauthorized: Token invalid" });
        req.user = decoded; // simpan payload token ke req.user
        next();
    });
};

exports.isAdminOrManager = (req, res, next) => {
    if (req.user.role === "kepala bagian") {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden: role tidak cukup" });
    }
};

// // Route
// app.get("/api/users", verifyToken, isAdminOrManager, (req, res) => {
//     // ambil data users dari db
// });
