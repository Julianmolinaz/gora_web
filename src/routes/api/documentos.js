const express = require("express");
const router = express.Router();
const DocumentoController = require("../../controllers/documento.controller"); 

router.post("/:solicitudId", DocumentoController.upload);

module.exports = router;
