const express = require("express");
const router = express.Router();
const SolicitudController = require("../../controllers/solicitud.controller");

router.get("/create", SolicitudController.create);

module.exports = router;