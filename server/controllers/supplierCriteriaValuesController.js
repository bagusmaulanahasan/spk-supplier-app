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

// exports.create = (req, res) => {
//     const {material_supply_type_id, supplier_id, values } = req.body;

//     if (!supplier_id || !Array.isArray(values)) {
//         return res.status(400).json({ error: "Invalid input" });
//     }

//     if (values.length === 0) {
//         return res.status(400).json({ error: "No values provided" });
//     }

//     const sql = "INSERT INTO supplier_criteria_values (material_supply_type_id, supplier_id, criteria_id, value) VALUES ?";
//     const valuesArray = values.map(({ criteria_id, value }) => [
//         material_supply_type_id,
//         supplier_id,
//         parseInt(criteria_id),
//         value,
//     ]);

//     db.query(sql, [valuesArray], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({
//             message: "Values inserted",
//             insertedCount: result.affectedRows,
//         });
//     });
// };

exports.create = (req, res) => {
    const { material_supply_type_id, suppliers } = req.body;

    if (!material_supply_type_id || !Array.isArray(suppliers)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const valuesArray = [];

    for (const supplier of suppliers) {
        if (!supplier.supplier_id || !Array.isArray(supplier.values)) {
            return res.status(400).json({ error: "Invalid supplier input" });
        }

        for (const { criteria_id, value } of supplier.values) {
            if (!criteria_id || value === undefined) {
                return res
                    .status(400)
                    .json({ error: "Invalid criteria value input" });
            }

            valuesArray.push([
                material_supply_type_id,
                supplier.supplier_id,
                parseInt(criteria_id),
                value,
            ]);
        }
    }

    if (valuesArray.length === 0) {
        return res.status(400).json({ error: "No values provided" });
    }

    const sql = `
        INSERT INTO supplier_criteria_values 
        (material_supply_type_id, supplier_id, criteria_id, value) 
        VALUES ?
    `;

    db.query(sql, [valuesArray], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            message: "Values inserted",
            insertedCount: result.affectedRows,
        });
    });
};

// exports.update = (req, res) => {
//     const {material_supply_type_id, supplier_id, criteria_id, value } = req.body;
//     db.query(
//         "UPDATE supplier_criteria_values SET material_supply_type_id = ?, supplier_id = ?, criteria_id = ?, value = ? WHERE id = ?",
//         [material_supply_type_id, supplier_id, criteria_id, value, req.params.id],
//         (err) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ message: "Result updated successfully" });
//         }
//     );
// };

exports.update = (req, res) => {
    const { material_supply_type_id, suppliers } = req.body;

    if (!material_supply_type_id || !Array.isArray(suppliers)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const updatePromises = [];

    for (const supplier of suppliers) {
        if (!supplier.supplier_id || !Array.isArray(supplier.values)) {
            return res.status(400).json({ error: "Invalid supplier input" });
        }

        for (const { criteria_id, value } of supplier.values) {
            if (!criteria_id || value === undefined) {
                return res
                    .status(400)
                    .json({ error: "Invalid criteria value input" });
            }

            const sql = `
                UPDATE supplier_criteria_values 
                SET value = ? 
                WHERE material_supply_type_id = ? 
                AND supplier_id = ? 
                AND criteria_id = ?
            `;

            const params = [
                value,
                material_supply_type_id,
                supplier.supplier_id,
                criteria_id,
            ];

            updatePromises.push(
                new Promise((resolve, reject) => {
                    db.query(sql, params, (err, result) => {
                        if (err) return reject(err);
                        resolve(result.affectedRows);
                    });
                })
            );
        }
    }

    Promise.all(updatePromises)
        .then((results) => {
            const updatedCount = results.reduce((sum, r) => sum + r, 0);
            res.json({
                message: "Update completed",
                updatedCount,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

exports.delete = (req, res) => {
    db.query(
        "DELETE FROM supplier_criteria_values WHERE id = ?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Result deleted successfully" });
        }
    );
};
