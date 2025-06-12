const db = require("../config/db");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM material_supply_types", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    db.query(
        "SELECT * FROM material_supply_types WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results[0]);
        }
    );
};

exports.create = (req, res) => {
    const { type_name, description } = req.body;
    db.query(
        "INSERT INTO material_supply_types (type_name, description) VALUES (?, ?)",
        [type_name, description],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, type_name, description });
        }
    );
};

exports.update = (req, res) => {
    const { type_name, description } = req.body;
    db.query(
        "UPDATE material_supply_types SET type_name = ?, description = ? WHERE id = ?",
        [type_name, description, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Material Supply Type updated successfully" });
        }
    );
};

exports.delete = (req, res) => {
    db.query("DELETE FROM material_supply_types WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Material Supply Type deleted successfully" });
    });
};
