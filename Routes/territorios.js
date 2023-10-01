const express = require("express");
const router = express.Router();
const { createTerritorio } = require("../Controllers/territorios");
const asyncError = require("../middleware/asyncErrors");

router.post("/create", asyncError(createTerritorio));

module.exports = router;