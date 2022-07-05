const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/auth.controller");

router.get("/", AuthController.index);
router.get("/logout", AuthController.logout);

module.exports = router;
