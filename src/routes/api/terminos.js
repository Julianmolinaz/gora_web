const express = require("express");
const router = express.Router();
const TerminosController = require("../../controllers/terminos.controller");

router.post("/generar-codigo", TerminosController.generarCodigo);

module.exports = router;

