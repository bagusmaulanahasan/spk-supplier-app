const db = require("../config/db");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM criteria_values", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    db.query(
        "SELECT * FROM criteria_values WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results[0]);
        }
    );
};

exports.create = (req, res) => {
    const { criteria_id, value, description } = req.body;
    db.query(
        "INSERT INTO criteria_values (criteria_id, value, description) VALUES (?, ?, ?)",
        [criteria_id, value, description],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, criteria_id, value, description });
        }
    );
};

exports.update = (req, res) => {
    const { criteria_id, value, description } = req.body;
    db.query(
        "UPDATE criteria_values SET criteria_id = ?, value = ?, description = ? WHERE id = ?",
        [criteria_id, value, description, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Criteria value updated successfully" });
        }
    );
};

exports.delete = (req, res) => {
    db.query(
        "DELETE FROM criteria_values WHERE id = ?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Criteria value deleted successfully" });
        }
    );
};
