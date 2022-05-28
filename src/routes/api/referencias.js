const express = require("express");
const router = express.Router();
const ReferenciaController = require("../../controllers/referencia.controller"); 

router.post("/multiple", ReferenciaController.storeMultiple);

module.exports = router;
