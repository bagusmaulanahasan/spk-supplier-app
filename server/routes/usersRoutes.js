const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const { verifyToken, isAdminOrManager } = require("../middleware/auth");

// hanya manager bisa akses
router.get("/", controller.getAll);
router.get("/:id", verifyToken, isAdminOrManager, controller.getById);
router.post("/", controller.create);
router.put("/:id", verifyToken, isAdminOrManager, controller.update);
router.delete("/:id", verifyToken, isAdminOrManager, controller.delete);

module.exports = router;
