const express = require("express");
const router = express.Router();
const { crearCongregacion, consultarCongregaciones } = require("../Controllers/congregaciones");
const asyncError = require("../middleware/asyncErrors");

router.post("/create", asyncError(crearCongregacion));
router.get("/get", asyncError(consultarCongregaciones));

module.exports = router;
