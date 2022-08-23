const express = require("express");
const { authorization } = require("../../middlewares");

const router = express.Router();
const DocumentoController = require("../../controllers/documento.controller"); 

router.post("/:solicitudId", authorization, DocumentoController.upload);
router.delete("/:documentoId", authorization, DocumentoController.destroy);

module.exports = router;
