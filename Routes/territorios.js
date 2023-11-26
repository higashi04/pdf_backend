const express = require("express");
const router = express.Router();
const { createTerritorio, getByCongregacionId, createMarcada } = require("../Controllers/territorios");
const asyncError = require("../middleware/asyncErrors");

router.post("/create", asyncError(createTerritorio));
router.post("/getbyCongregacionId", asyncError(getByCongregacionId));
router.post("/createMarked", asyncError(createMarcada));

module.exports = router;