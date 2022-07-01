const express = require("express");
const router = express.Router();
const CuentaController = require("../../controllers/cuenta.controller");

router.get("/", CuentaController.index);

module.exports = router;
