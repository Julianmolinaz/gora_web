const express = require("express");
const router = express.Router();
const ReferenciaController = require("../../controllers/referencia.controller");

router.get("/create/:solicitudId", ReferenciaController.create);

module.exports = router;
