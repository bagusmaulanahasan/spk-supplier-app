const bcrypt = require("bcrypt");
const db = require("../config/db"); // sesuaikan dengan strukturmu

exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [username, hashedPassword, role],
            (err, result) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({ error: "Email sudah terdaftar." });
                    }
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: "User berhasil didaftarkan", id: result.insertId });
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
