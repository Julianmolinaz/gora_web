const express = require("express");
const router = express.Router();
const MunicipioController = require("../../controllers/municipio.controller"); 

router.get("/", MunicipioController.list);

router.get("/get-departamento/:departamentoId", MunicipioController.getPorDepartamento);

module.exports = router;
