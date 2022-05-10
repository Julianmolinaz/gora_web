const express = require("express");
const router = express.Router();
const TerminosController = require("../../controllers/terminos.controller");

router.post("/aceptar-terminos", TerminosController.aceptarTerminosCondiciones);

module.exports = router;

