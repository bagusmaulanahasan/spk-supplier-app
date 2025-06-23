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

// exports.create = (req, res) => {
//     const { criteria_id, value, description } = req.body;
//     db.query(
//         "INSERT INTO criteria_values ( criteria_id, value, description) VALUES (?, ?, ?)",
//         [ criteria_id, value, description],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ id: result.insertId, criteria_id, value, description });
//         }
//     );
// };

// exports.update = (req, res) => {
//     const { criteria_id, value, description } = req.body;
//     db.query(
//         "UPDATE criteria_values SET \ criteria_id = ?, value = ?, description = ? WHERE id = ?",
//         [ criteria_id, value, description, req.params.id],
//         (err) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ message: "Criteria value updated successfully" });
//         }
//     );
// };

// Tambah satu atau banyak data
exports.create = (req, res) => {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const values = data.map(({ criteria_id, value, description }) => [
        criteria_id,
        value,
        description,
    ]);

    db.query(
        "INSERT INTO criteria_values (criteria_id, value, description) VALUES ?",
        [values],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
                message: "Criteria values added successfully",
                insertedCount: result.affectedRows,
            });
        }
    );
};

// Edit satu data
// exports.update = (req, res) => {
//     const { criteria_id, value, description } = req.body;
//     db.query(
//         "UPDATE criteria_values SET criteria_id = ?, value = ?, description = ? WHERE id = ?",
//         [criteria_id, value, description, req.params.id],
//         (err) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ message: "Criteria value updated successfully" });
//         }
//     );
// };

exports.update = (req, res) => {
    const updates = req.body; // array of { id, criteria_id, value, description }

    const updatePromises = updates.map((item) => {
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE criteria_values SET criteria_id = ?, value = ?, description = ? WHERE id = ?",
                [item.criteria_id, item.value, item.description, item.id],
                (err) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    });

    Promise.all(updatePromises)
        .then(() => res.json({ message: "All records updated successfully" }))
        .catch((err) => res.status(500).json({ error: err.message }));
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
