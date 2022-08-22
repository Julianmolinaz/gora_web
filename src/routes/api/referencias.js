const express = require("express");
const router = express.Router();
const ReferenciaController = require("../../controllers/referencia.controller"); 

router.post("/multiple/:solicitudId", ReferenciaController.storeMultiple);

router.put("/multiple/:solicitudId", ReferenciaController.updateMultiple);

module.exports = router;
