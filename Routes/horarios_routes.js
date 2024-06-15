const express = require('express');
const router = express.Router();
const { createHorario, ReadHorarios, updateHorarios, deleteHorarios } = require("../Controllers/horarios_controller");
const asyncError = require("../middleware/asyncErrors");

router.post("/create", asyncError(createHorario));
router.post("/read", asyncError(ReadHorarios));
router.post("/update", asyncError(updateHorarios));
router.post("/delete", asyncError(deleteHorarios));

module.exports = router;