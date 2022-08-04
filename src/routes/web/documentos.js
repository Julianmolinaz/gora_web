const express = require("express");
const authorization = require("../../middlewares/authorization");
const DocumentoController = require("../../controllers/documento.controller");

const router = express.Router();

router.get("/create/:solicitudId", authorization, DocumentoController.create);
//router.post("/:solicitudId", authorization, DocumentoController.upload);
router.get("/edit/:solicitudId", DocumentoController.edit);

module.exports = router;
