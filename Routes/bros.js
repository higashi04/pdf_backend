const express = require("express");
const router = express.Router();
const {
  createBrother,
  fetchBrothersByCongregation,
  setBrotherActivoStatus,
  fetchBrotheresByCongregationAndActive,
} = require("../Controllers/brothers");
const asyncError = require("../middleware/asyncErrors");

router.post("/new", asyncError(createBrother));
router.post("/consultar", asyncError(fetchBrothersByCongregation));
router.post("/editStatus", asyncError(setBrotherActivoStatus));
router.post("/fetchActive", asyncError(fetchBrotheresByCongregationAndActive));

module.exports = router;
