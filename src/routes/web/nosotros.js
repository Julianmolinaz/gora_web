const express = require("express");
const router = express.Router();
const NosotrosController = require("../../controllers/nosotros.controller");

router.get("/", NosotrosController.index);

module.exports = router;
