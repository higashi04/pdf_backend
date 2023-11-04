const express = require("express");
const router = express.Router();
const { createTerritorio, getByCongregacionId } = require("../Controllers/territorios");
const asyncError = require("../middleware/asyncErrors");

router.post("/create", asyncError(createTerritorio));
router.post("/getbyCongregacionId", asyncError(getByCongregacionId))
module.exports = router;