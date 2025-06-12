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

// exports.create = (req, res) => {
//     const { material_supply_type_id, initial, name } = req.body;
//     db.query(
//         "INSERT INTO suppliers (material_supply_type_id, initial, name) VALUES (?, ?, ?)",
//         [material_supply_type_id, initial, name],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ id: result.insertId, initial, name });
//         }
//     );
// };

exports.create = (req, res) => {
    const suppliers = req.body; // expecting array of { name, material_supply_type_id }

    if (!Array.isArray(suppliers) || suppliers.length === 0) {
        return res.status(400).json({ error: "Data supplier tidak valid atau kosong." });
    }

    const values = suppliers.map((s) => [s.material_supply_type_id, s.name]);

    const sql = "INSERT INTO suppliers (material_supply_type_id, name) VALUES ?";

    db.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const insertedSuppliers = suppliers.map((s, i) => ({
            id: result.insertId + i,
            material_supply_type_id: s.material_supply_type_id,
            name: s.name,
        }));

        res.json({ message: "Supplier berhasil ditambahkan", data: insertedSuppliers });
    });
};


// exports.update = (req, res) => {
//     const { material_supply_type_id, name } = req.body;
//     db.query(
//         "UPDATE suppliers SET material_supply_type_id = ?, name = ? WHERE id = ?",
//         [material_supply_type_id, name, req.params.id],
//         (err) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ message: "Result updated successfully" });
//         }
//     );
// };

exports.update = (req, res) => {
    const dataArray = Array.isArray(req.body) ? req.body : [req.body];

    const promises = dataArray.map(item => {
        const { id, material_supply_type_id, name } = item;
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE suppliers SET material_supply_type_id = ?, name = ? WHERE id = ?",
                [material_supply_type_id, name, id],
                (err) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    });

    Promise.all(promises)
        .then(() => res.json({ message: "Suppliers updated successfully" }))
        .catch(err => res.status(500).json({ error: err.message }));
};


exports.delete = (req, res) => {
    db.query("DELETE FROM suppliers WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Result deleted successfully" });
    });
};
