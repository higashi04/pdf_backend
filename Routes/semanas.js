const express = require("express");
const router = express.Router();
const {createWeek, fetchWeeks, createRolAcomodadores, fetchWeekData, saveRol} = require("../Controllers/semanas");
const asyncError = require("../middleware/asyncErrors");

router.post("/new", asyncError(createWeek));
router.get("/getWeeks", asyncError(fetchWeeks));
router.post("/rolAcomodadores", asyncError(createRolAcomodadores));
router.post("/getOneWeek", fetchWeekData);
router.post("/save", saveRol);
module.exports = router;