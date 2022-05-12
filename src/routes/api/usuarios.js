const express = require("express");
const router = express.Router();
const UsuarioController = require("../../controllers/usuario.controller");

router.post("/", UsuarioController.store);

module.exports = router;