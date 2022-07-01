const express = require("express");
const authorization = require("../../middlewares/authorization");
const DocumentoController = require("../../controllers/documento.controller");

const router = express.Router();

router.get("/create/:solicitudId", DocumentoController.create);
router.post("/:solicitudId", DocumentoController.upload);

module.exports = router;
