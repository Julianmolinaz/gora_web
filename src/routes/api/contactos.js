const express = require("express");
const router = express.Router();
const ContactoController = require("../../controllers/contacto.controller"); 

router.get("/get-ciudades/:departamentoId", ContactoController.getCiudades);

router.get("/get-contactos/:ciudadId", ContactoController.getContactos);

module.exports = router;
