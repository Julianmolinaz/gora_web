const express = require("express");
const { authorization } = require("../../middlewares");

const router = express.Router();
const ReferenciaController = require("../../controllers/referencia.controller"); 

router.post("/multiple/:solicitudId", authorization, ReferenciaController.storeMultiple);
router.put("/multiple/:solicitudId", authorization, ReferenciaController.updateMultiple);

module.exports = router;
