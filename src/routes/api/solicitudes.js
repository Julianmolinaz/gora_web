const express = require("express");
const authorization = require("../../middlewares/authorization");
const SolicitudController = require("../../controllers/solicitud.controller");

const router = express.Router();

router.post("/", SolicitudController.store);

router.post("/store-with-cliente", authorization, SolicitudController.storeWithCliente);

module.exports = router;
