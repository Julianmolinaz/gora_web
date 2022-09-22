const express = require("express");
const router = express.Router();
const { rate_limiter } = require("../../middlewares");
const AuthController = require("../../controllers/auth.controller");

router.post("/login", rate_limiter, AuthController.login);
router.post("/login-solicitud", rate_limiter, AuthController.loginSolicitud);

module.exports = router;
