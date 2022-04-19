const express = require("express");
const router = express.Router();
const ClienteController = require("../../controllers/cliente.controller");

router.get("/create", ClienteController.create);

module.exports = router;
