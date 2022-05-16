const express = require("express");
const router = express.Router();
const SolicitudController = require("../../controllers/solicitud.controller");

router.post("/", SolicitudController.store);

router.post("/store-with-cliente", SolicitudController.storeWithCliente);

module.exports = router;
