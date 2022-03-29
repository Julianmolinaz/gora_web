const express = require("express");
const router = express.Router();
const ContactoController = require("../../controllers/contacto.controller"); 

router.get("/get-ciudades/:departamentoId", ContactoController.getCiudades);

router.get("/get-sucursales/:ciudadId", ContactoController.getSucursalesPorCiudad);

module.exports = router;
