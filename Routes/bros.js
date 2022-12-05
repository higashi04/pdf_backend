const express = require("express");
const router = express.Router();
const {createBrother, fetchBrothersByCongregation, setBrotherActivoStatus} = require("../Controllers/brothers");
const asyncError = require("../middleware/asyncErrors");

router.post("/new", asyncError(createBrother));
router.post("/consultar", asyncError(fetchBrothersByCongregation));
router.post("/editStatus", asyncError(setBrotherActivoStatus));

module.exports = router;