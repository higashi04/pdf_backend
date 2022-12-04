const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../Controllers/user");
const asyncError = require("../middleware/asyncErrors");

router.post("/registrarse", asyncError(registerUser));
router.post("/iniciar", asyncError(loginUser));
router.post("/perfil", getMe);

module.exports = router;
