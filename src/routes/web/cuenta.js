const express = require("express");
const { authorization } = require("../../middlewares");
const CuentaController = require("../../controllers/cuenta.controller");

const router = express.Router();

router.get("/", authorization, CuentaController.index);
router.get("/:solicitudId", authorization, CuentaController.show);

module.exports = router;
