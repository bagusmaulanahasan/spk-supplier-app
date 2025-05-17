const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // sesuaikan dengan strukturmu

// Sesuaikan dengan secret dari .env atau config
const JWT_SECRET = process.env.JWT_SECRET || "jdsofh0wr029839udf0w39ue0";

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            if (results.length === 0) {
                return res
                    .status(401)
                    .json({ message: "Username tidak ditemukan" });
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Password salah" });
            }

            // Cek role untuk akses
            if (user.role !== "manager" && user.role !== "admin") {
                return res
                    .status(403)
                    .json({ message: "Akses ditolak. Role tidak sesuai." });
            }

            // Buat token JWT
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
                JWT_SECRET,
                { expiresIn: "1d" } // optional: token expired dalam 1 hari
            );

            res.json({ message: "Login berhasil", token, role: user.role });
        }
    );
};
