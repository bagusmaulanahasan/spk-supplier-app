const express = require("express");
const router = express.Router();

const auth = require("../controllers/loginController");
// const { verifyToken, onlyManager } = require("../middleware/auth");

router.post("/", auth.login);

module.exports = router;