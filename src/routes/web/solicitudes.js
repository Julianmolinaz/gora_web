const express = require("express");
const authorization = require("../../middlewares/authorization");
const SolicitudController = require("../../controllers/solicitud.controller");

const router = express.Router();

router.get("/create", authorization, SolicitudController.create);

module.exports = router;
