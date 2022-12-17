const express = require("express");
const router = express.Router();
const {createWeek, fetchWeeks, createRolAcomodadores} = require("../Controllers/semanas");
const asyncError = require("../middleware/asyncErrors");

router.post("/new", asyncError(createWeek));
router.get("/getWeeks", asyncError(fetchWeeks));
router.post("/rolAcomodadores", asyncError(createRolAcomodadores));
module.exports = router;