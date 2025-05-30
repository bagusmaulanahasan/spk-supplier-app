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

// exports.create = (req, res) => {
//     const { name, description, type, weight } = req.body;
//     db.query(
//         "INSERT INTO criteria (name, description, type, weight) VALUES (?, ?, ?, ?)",
//         [name, description, type, weight],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ id: result.insertId, name, description, type, weight });
//         }
//     );
// };

exports.create = (req, res) => {
    const data = req.body;

    // Pastikan data berupa array dan tidak kosong
    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: "Data harus berupa array dan tidak boleh kosong." });
    }

    // Validasi isi data (opsional tapi direkomendasikan)
    const values = data.map((item) => [
        item.name,
        item.description,
        item.type,
        item.weight,
    ]);

    const query = `
        INSERT INTO criteria (name, description, type, weight)
        VALUES ?
    `;

    db.query(query, [values], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
            message: `${result.affectedRows} kriteria berhasil ditambahkan.`,
            insertedCount: result.affectedRows,
        });
    });
};


// exports.update = (req, res) => {
//     const { name, description, type, weight } = req.body;
//     db.query(
//         "UPDATE criteria SET name = ?, description = ?, type = ?, weight = ? WHERE id = ?",
//         [name, description, type, weight, req.params.id],
//         (err) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ message: "Criteria updated successfully" });
//         }
//     );
// };

exports.update = (req, res) => {
    const dataArray = Array.isArray(req.body) ? req.body : [req.body];

    const promises = dataArray.map(item => {
        const { id, name, description, type, weight } = item;
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE criteria SET name = ?, description = ?, type = ?, weight = ? WHERE id = ?",
                [name, description, type, weight, id],
                (err) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    });

    Promise.all(promises)
        .then(() => res.json({ message: "Criteria updated successfully" }))
        .catch((err) => res.status(500).json({ error: err.message }));
};


exports.delete = (req, res) => {
    db.query("DELETE FROM criteria WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Criteria deleted successfully" });
    });
};
