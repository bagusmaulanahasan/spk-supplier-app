const express = require("express");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;

const cors = require("cors");
// app.use(cors({
//     origin: "http://localhost:5173", // ganti dengan URL React
//     credentials: true,
// }));

const allowedOrigins = [
    "http://localhost:5173", // URL ReactJS
    "http://192.168.1.59:5173", // URL local
    "https://d966-36-90-7-44.ngrok-free.app", // URL ngrok
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Jika tidak ada origin (misalnya request Postman atau request server-to-server)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = `Origin ${origin} tidak diizinkan oleh CORS policy.`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

app.use(express.json());

// Import routes
const criteriaRoutes = require("./routes/criteriaRoutes");
const criteriaValuesRoutes = require("./routes/criteriaValuesRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const supplierCriteriaValuesRoutes = require("./routes/supplierCriteriaValuesRoutes");
const suppliersRoutes = require("./routes/suppliersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const weightsRoutes = require("./routes/weightsRoutes");
const login = require("./routes/loginRoutes");
const register = require("./routes/registerRoutes");

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/criteria", criteriaRoutes);
app.use("/api/criteria-values", criteriaValuesRoutes);
app.use("/api/results", resultsRoutes);
app.use("/api/supplier-criteria-values", supplierCriteriaValuesRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/weights", weightsRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
