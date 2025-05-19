const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const { verifyToken, isAdminOrManager } = require("../middleware/auth");

// hanya manager bisa akses
router.get("/", verifyToken, isAdminOrManager, controller.getAll);
router.get("/:id", verifyToken, isAdminOrManager, controller.getById);
router.post("/", verifyToken, isAdminOrManager, controller.create);
router.put("/:id", verifyToken, isAdminOrManager, controller.update);
router.delete("/:id",  controller.delete);

module.exports = router;
