const db = require("../config/db");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM results", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    db.query(
        "SELECT * FROM results WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results[0]);
        }
    );
};

exports.create = (req, res) => {
    const { supplier_id, total } = req.body;
    db.query(
        "INSERT INTO results (supplier_id, total) VALUES (?, ?)",
        [supplier_id, total],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, supplier_id, total });
        }
    );
};

exports.update = (req, res) => {
    const { supplier_id, total } = req.body;
    db.query(
        "UPDATE results SET supplier_id = ?, total = ? WHERE id = ?",
        [supplier_id, total, req.params.id],
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
