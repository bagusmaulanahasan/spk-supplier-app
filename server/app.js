const express = require("express");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
    origin: "http://localhost:5173", // ganti dengan URL React kamu
    credentials: true,
}));  // Mengizinkan CORS dari semua asal

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
