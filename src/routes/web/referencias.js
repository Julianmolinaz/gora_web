const express = require("express");
const authorization = require("../../middlewares/authorization");
const ReferenciaController = require("../../controllers/referencia.controller");

const router = express.Router();

router.get("/create/:solicitudId", authorization, ReferenciaController.create);

module.exports = router;
