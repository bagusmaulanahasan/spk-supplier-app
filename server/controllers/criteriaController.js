const db = require("../config/db");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM criteria", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    db.query(
        "SELECT * FROM criteria WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results[0]);
        }
    );
};

exports.create = (req, res) => {
    const { name, description, type } = req.body;
    db.query(
        "INSERT INTO criteria (name, description, type) VALUES (?, ?, ?)",
        [name, description, type],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, name, description, type });
        }
    );
};

exports.update = (req, res) => {
    const { name, description, type } = req.body;
    db.query(
        "UPDATE criteria SET name = ?, description = ?, type = ? WHERE id = ?",
        [name, description, type, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Criteria updated successfully" });
        }
    );
};

exports.delete = (req, res) => {
    db.query("DELETE FROM criteria WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Criteria deleted successfully" });
    });
};
