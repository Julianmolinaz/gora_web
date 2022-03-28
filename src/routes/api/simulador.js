const express = require("express");
const router = express.Router();
const SimuladorController = require("../../controllers/simulador.controller");

router.get("/insumos", SimuladorController.getInsumos);

router.post("/get-valor-cuota", SimuladorController.calcularValorCuota);

module.exports = router; 
