const express = require("express");
const router = express.Router();
const CiudadController = require("../../controllers/ciudad.controller"); 

router.get("/get-departamento/:departamentoId", CiudadController.getPorDepartamento);

module.exports = router;
