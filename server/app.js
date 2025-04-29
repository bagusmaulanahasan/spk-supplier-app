const express = require("express");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// Import routes
const criteriaRoutes = require("./routes/criteriaRoutes");
const criteriaValuesRoutes = require("./routes/criteriaValuesRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const supplierCriteriaValuesRoutes = require("./routes/supplierCriteriaValuesRoutes");
const suppliersRoutes = require("./routes/suppliersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const weightsRoutes = require("./routes/weightsRoutes");

// Register routes
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
