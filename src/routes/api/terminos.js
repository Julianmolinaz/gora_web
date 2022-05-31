const express = require("express");
const router = express.Router();
const TerminosController = require("../../controllers/terminos.controller");

router.get("/generar-codigo/:usuarioId", TerminosController.generarCodigo);

router.post("/validar-codigo", TerminosController.validarCodigo);

module.exports = router;

