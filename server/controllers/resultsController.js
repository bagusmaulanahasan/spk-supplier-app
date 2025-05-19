const db = require("../config/db");

// exports.getAll = (req, res) => {
//     db.query("SELECT * FROM results", (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// };

// exports.getById = (req, res) => {
//     db.query(
//         "SELECT * FROM results WHERE id = ?",
//         [req.params.id],
//         (err, results) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json(results[0]);
//         }
//     );
// };

// // exports.create = (req, res) => {
// //     const { supplier_id, total } = req.body;
// //     db.query(
// //         "INSERT INTO results (supplier_id, total) VALUES (?, ?)",
// //         [supplier_id, total],
// //         (err, result) => {
// //             if (err) return res.status(500).json({ error: err.message });
// //             res.json({ id: result.insertId, supplier_id, total });
// //         }
// //     );
// // };
// // exports.create = (req, res) => {
// //     const { supplier_id, score, rank } = req.body;
// //     db.query(
// //         "INSERT INTO results (supplier_id, score, rank) VALUES (?, ?, ?)",
// //         [supplier_id, score, rank],
// //         (err, result) => {
// //             if (err) return res.status(500).json({ error: err.message });
// //             res.json({ id: result.insertId, supplier_id, score, rank });
// //         }
// //     );
// // };

exports.create = (req, res) => {
    const results = req.body;

    if (!Array.isArray(results)) {
        return res.status(400).json({ error: "Expected an array of results" });
    }

    const values = results.map((r) => [r.supplier_id, r.score, r.ranking]);
    console.log("Values to insert:", values);

    const sql = "INSERT INTO results (supplier_id, score, ranking) VALUES ?";
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: err.message });
        }

        console.log("Insert Result:", result);
        res.json({
            message: "Results inserted successfully",
            insertedCount: result.affectedRows,
        });
    });
};


// // exports.update = (req, res) => {
// //     const { supplier_id, total } = req.body;
// //     db.query(
// //         "UPDATE results SET supplier_id = ?, total = ? WHERE id = ?",
// //         [supplier_id, total, req.params.id],
// //         (err) => {
// //             if (err) return res.status(500).json({ error: err.message });
// //             res.json({ message: "Result updated successfully" });
// //         }
// //     );
// // };
// exports.update = (req, res) => {
//     const { supplier_id, score, ranking } = req.body;
//     db.query(
//         "UPDATE results SET supplier_id = ?, score, ranking = ? WHERE id = ?",
//         [supplier_id, score, ranking, req.params.id],
//         (err) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ message: "Result updated successfully" });
//         }
//     );
// };

// exports.delete = (req, res) => {
//     db.query("DELETE FROM results WHERE id = ?", [req.params.id], (err) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ message: "Result deleted successfully" });
//     });
// };

// controllers/resultsController.js

// exports.getAll = (req, res) => {
//     const { date } = req.query;

//     if (date) {
//         // Cocokkan string date dengan format yang sama persis
//         const sql = `
//             SELECT * FROM results
//             WHERE DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') = ?
//             ORDER BY ranking ASC
//         `;

//         db.query(sql, [date], (err, results) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json(results);
//         });
//     } else {
//         // Ambil data terbaru
//         const latestSql = `
//             SELECT * FROM results
//             WHERE created_at = (
//                 SELECT MAX(created_at) FROM results
//             )
//             ORDER BY ranking ASC
//         `;

//         db.query(latestSql, (err, results) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json(results);
//         });
//     }
// };

exports.getAll = (req, res) => {
    const { date } = req.query;

    let sql = "SELECT * FROM results";
    const params = [];

    if (date) {
        sql += " WHERE DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') = ?";
        params.push(date);
    }

    sql += " ORDER BY ranking ASC";

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getDates = (req, res) => {
    db.query(
        `SELECT DISTINCT DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM results ORDER BY created_at DESC;`,
        (err, rows) => {
            if (err) {
                console.error("Gagal ambil dates:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            res.json(rows.map((row) => row.created_at));
        }
    );
};
