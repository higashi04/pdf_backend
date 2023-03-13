const express = require("express");
const router = express.Router();
const {createWeek, fetchWeeks, createRolAcomodadores, fetchWeekData} = require("../Controllers/semanas");
const asyncError = require("../middleware/asyncErrors");

router.post("/new", asyncError(createWeek));
router.get("/getWeeks", asyncError(fetchWeeks));
router.post("/rolAcomodadores", asyncError(createRolAcomodadores));
router.post("/getOneWeek", fetchWeekData);
module.exports = router;