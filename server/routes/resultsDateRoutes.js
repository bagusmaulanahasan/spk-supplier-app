const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT DISTINCT DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at
            FROM results
            ORDER BY created_at DESC
        `);

        // Debug log hasil query
        console.log("Hasil query dates:", rows);

        // Pastikan mengembalikan array JSON
        const dates = rows.map(row => row.created_at);
        res.json(dates);
    } catch (error) {
        console.error("Gagal ambil tanggal:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
