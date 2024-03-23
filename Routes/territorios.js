const express = require("express");
const router = express.Router();
const { createTerritorio, getByCongregacionId, createMarcada, DeleteMarcada, UpdateMarcada, addNumberedBlock, deleteNumberedBlock, editNumberedBlock } = require("../Controllers/territorios");
const asyncError = require("../middleware/asyncErrors");

router.post("/create", asyncError(createTerritorio));
router.post("/getbyCongregacionId", asyncError(getByCongregacionId));
router.post("/createMarked", asyncError(createMarcada));
router.post("/DeleteMarked", asyncError(DeleteMarcada));
router.post("/UpdateMarked", asyncError(UpdateMarcada));
router.post("/addBlock", asyncError(addNumberedBlock));
router.post("/deleteBlock", asyncError(deleteNumberedBlock));
router.post("/editBlock", asyncError(editNumberedBlock));

module.exports = router;