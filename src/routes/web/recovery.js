const express = require("express");
const router = express.Router();
const RecoveryController = require("../../controllers/recovery.controller");

router.get("/", RecoveryController.index);

module.exports = router;
