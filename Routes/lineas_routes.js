const express = require("express");
const router = express.Router();
const { createLines } = require("../Controllers/lineas_controller");
const asyncError = require("../middleware/asyncErrors");

router.post("/create", asyncError(createLines));

module.exports = router;