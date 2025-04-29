const db = require("../config/db");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM weights", (err, results) => {
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
    const { criteria_id, weight } = req.body;
    db.query(
        "INSERT INTO weights (criteria_id, weight) VALUES (?, ?)",
        [criteria_id, weight],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, criteria_id, weight });
        }
    );
};

exports.update = (req, res) => {
    const { criteria_id, weight } = req.body;
    db.query(
        "UPDATE results SET criteria_id = ?, weight = ? WHERE id = ?",
        [criteria_id, weight, req.params.id],
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