const db = require("../config/db");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    db.query(
        "SELECT * FROM supplier WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results[0]);
        }
    );
};

exports.create = (req, res) => {
    const { username, password } = req.body;
    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, username, password });
        }
    );
};

exports.update = (req, res) => {
    const { username, password } = req.body;
    db.query(
        "UPDATE results SET username = ?, password = ? WHERE id = ?",
        [username, password, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Result updated successfully" });
        }
    );
};

exports.delete = (req, res) => {
    db.query("DELETE FROM results WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Result deleted successfully" });
    });
};