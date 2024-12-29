const express = require("express");
const router = express.Router();
const acomodadoresController = require("../Controllers/acomodadores");

router.get("/get", acomodadoresController.ReadAcomodadores);
router.post("/create", acomodadoresController.CreateAcomodador);
router.put("/update", acomodadoresController.UpdateAcomodador);
router.delete("/delete/:id", acomodadoresController.DeleteAcomodador);

module.exports = router;