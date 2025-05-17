const express = require("express");
const router = express.Router();

const auth = require("../controllers/registerController");

router.post("/", auth.register);

module.exports = router;