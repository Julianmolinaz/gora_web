const express = require("express");
const router = express.Router();
const UsuarioController = require("../../controllers/usuario.controller");

router.post("/", UsuarioController.salvarUsuarioFlujoSolicitud);

router.post("/validar-usuario-existente", UsuarioController.validarExistenciaDeUsuario);

router.post("/generar-codigo-terminos", UsuarioController.generarCodigoTerminos);

router.post("/validar-codigo-terminos", UsuarioController.validarCodigoTerminos);

router.post("/crear-usuario-flujo-inicial", UsuarioController.crearUsuarioFlujoInicial);

module.exports = router;
