const express = require("express");
const router = express.Router();
const TerminosController = require("../../controllers/terminos.controller");

router.post("/registrar-acteptar-terminos", TerminosController.registrarAceptarTerminos);

module.exports = router;

