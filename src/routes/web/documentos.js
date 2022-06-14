const express = require("express");
const router = express.Router();
const DocumentoController = require("../../controllers/documento.controller");

router.get("/:solicitudId", DocumentoController.index);

module.exports = router;
