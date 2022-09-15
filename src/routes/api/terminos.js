const express = require("express");
const router = express.Router();
const { authorization } = require("../../middlewares");
const TerminosController = require("../../controllers/terminos.controller");

router.get("/generar-codigo", authorization, TerminosController.generarCodigoUsuarioExistente);
router.post("/generar-codigo", TerminosController.generarCodigoUsuarioNuevo);

module.exports = router;

