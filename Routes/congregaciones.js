const express = require("express");
const router = express.Router();
const { crearCongregacion } = require("../Controllers/congregaciones");
const asyncError = require("../middleware/asyncErrors");

router.post("/create", asyncError(crearCongregacion));

module.exports = router;
