const express = require("express");
const authorization = require("../../middlewares/authorization");
const DocumentoController = require("../../controllers/documento.controller");

const router = express.Router();

router.get("/create/:solicitudId", authorization, DocumentoController.create);
router.get("/edit/:solicitudId", authorization, DocumentoController.edit);

module.exports = router;
