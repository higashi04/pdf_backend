const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe, tryOutnodemailer, getAllByCongregationId, updateUser, getProfileTypes } = require("../Controllers/user");
const asyncError = require("../middleware/asyncErrors");

router.post("/registrarse", asyncError(registerUser));
router.post("/iniciar", asyncError(loginUser));
router.post("/perfil", getMe);
router.post("/get", asyncError(getAllByCongregationId));
router.post("/update", asyncError(updateUser));

router.get("/profiles", asyncError(getProfileTypes));

router.post("/try", asyncError(tryOutnodemailer));


module.exports = router;
