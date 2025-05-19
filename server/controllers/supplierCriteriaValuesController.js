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

// exports.create = (req, res) => {
//     const { supplier_id, criteria_id, value } = req.body;
//     db.query(
//         "INSERT INTO supplier_criteria_values (supplier_id, criteria_id, value) VALUES (?, ?, ?)",
//         [supplier_id, criteria_id, value],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ id: result.insertId, supplier_id, criteria_id, value });
//         }
//     );
// };

// exports.create = (req, res) => {
//     const { supplier_id, values } = req.body;

//     if (!supplier_id || typeof values !== "object") {
//         return res.status(400).json({ error: "Invalid input" });
//     }

//     const entries = Object.entries(values); // [ [criteria_id, value], ... ]
//     if (entries.length === 0) {
//         return res.status(400).json({ error: "No values provided" });
//     }

//     const sql = "INSERT INTO supplier_criteria_values (supplier_id, criteria_id, value) VALUES ?";
//     const valuesArray = entries.map(([criteria_id, value]) => [supplier_id, parseInt(criteria_id), value]);

//     db.query(sql, [valuesArray], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({
//             message: "Values inserted",
//             insertedCount: result.affectedRows,
//         });
//     });
// };

exports.create = (req, res) => {
    const { supplier_id, values } = req.body;

    if (!supplier_id || !Array.isArray(values)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    if (values.length === 0) {
        return res.status(400).json({ error: "No values provided" });
    }

    const sql = "INSERT INTO supplier_criteria_values (supplier_id, criteria_id, value) VALUES ?";
    const valuesArray = values.map(({ criteria_id, value }) => [
        supplier_id,
        parseInt(criteria_id),
        value,
    ]);

    db.query(sql, [valuesArray], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            message: "Values inserted",
            insertedCount: result.affectedRows,
        });
    });
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