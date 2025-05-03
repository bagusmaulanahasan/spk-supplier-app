const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.getAll = (req, res) => {
    db.query("SELECT username, role FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    db.query(
        "SELECT username, role FROM users WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results[0]);
        }
    );
};

exports.create = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10
        db.query(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [username, hashedPassword, role],
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id: result.insertId, username, role });
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10
        db.query(
            "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?",
            [username, hashedPassword, role, req.params.id],
            (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "User updated successfully" });
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User deleted successfully" });
    });
};
