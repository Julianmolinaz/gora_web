const express = require("express");
const router = express.Router();
const ContactoController = require("../../controllers/contacto.controller");

router.get("/", ContactoController.index);

module.exports = router;
