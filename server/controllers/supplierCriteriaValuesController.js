const db = require("../config/db");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM supplier_criteria_values", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    db.query(
        "SELECT * FROM supplier_criteria_values WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results[0]);
        }
    );
};

exports.create = (req, res) => {
    const { supplier_id, criteria_id, value } = req.body;
    db.query(
        "INSERT INTO supplier_criteria_values (supplier_id, criteria_id, value) VALUES (?, ?, ?)",
        [supplier_id, criteria_id, value],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, supplier_id, criteria_id, value });
        }
    );
};

exports.update = (req, res) => {
    const { supplier_id, criteria_id, value } = req.body;
    db.query(
        "UPDATE supplier_criteria_values SET supplier_id = ?, criteria_id = ?, value = ? WHERE id = ?",
        [supplier_id, criteria_id, value, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Result updated successfully" });
        }
    );
};

exports.delete = (req, res) => {
    db.query("DELETE FROM supplier_criteria_values WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Result deleted successfully" });
    });
};