const express = require("express");
const router = express.Router();
const { createTerritorio, getByCongregacionId, createMarcada, DeleteMarcada } = require("../Controllers/territorios");
const asyncError = require("../middleware/asyncErrors");

router.post("/create", asyncError(createTerritorio));
router.post("/getbyCongregacionId", asyncError(getByCongregacionId));
router.post("/createMarked", asyncError(createMarcada));
router.post("/DeleteMarked", asyncError(DeleteMarcada));

module.exports = router;