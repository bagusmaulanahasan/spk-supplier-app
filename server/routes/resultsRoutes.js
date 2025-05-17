const express = require("express");
const router = express.Router();
const controller = require("../controllers/resultsController");

router.get("/", controller.getAll);
// router.get("/:id", controller.getById);
router.get("/dates", controller.getDates);  // tambahkan ini
router.post("/", controller.create);
// router.put("/:id", controller.update);
// router.delete("/:id", controller.delete);

module.exports = router;
