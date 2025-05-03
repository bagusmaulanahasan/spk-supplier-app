const db = require("../config/db");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM suppliers", (err, results) => {
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
    const { initial, name } = req.body;
    db.query(
        "INSERT INTO suppliers (initial, name) VALUES (?, ?)",
        [initial, name],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, initial, name });
        }
    );
};

exports.update = (req, res) => {
    const { initial, name } = req.body;
    db.query(
        "UPDATE suppliers SET initial = ?, name = ? WHERE id = ?",
        [initial, name, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Result updated successfully" });
        }
    );
};

exports.delete = (req, res) => {
    db.query("DELETE FROM suppliers WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Result deleted successfully" });
    });
};