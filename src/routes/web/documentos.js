const express = require("express");
const authorization = require("../../middlewares/authorization");
const DocumentoController = require("../../controllers/documento.controller");

const router = express.Router();

router.get("/:solicitudId", authorization, DocumentoController.index);

module.exports = router;
