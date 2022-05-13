const express = require("express");
const router = express.Router();
const UsuarioController = require("../../controllers/usuario.controller");

router.post("/", UsuarioController.store);

router.get("/send-code/:usuarioId", UsuarioController.validarMovil);

module.exports = router;
