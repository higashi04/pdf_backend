const express = require("express");
const router = express.Router();
const {createWeek, fetchWeeks} = require("../Controllers/semanas");
const asyncError = require("../middleware/asyncErrors");

router.post("/new", asyncError(createWeek));
router.get("/getWeeks", asyncError(fetchWeeks));
module.exports = router;