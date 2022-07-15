const express = require("express");
const authorization = require("../../middlewares/authorization");
const AuthController = require("../../controllers/auth.controller");

const router = express.Router();

router.get("/", AuthController.index);
router.get("/logout", authorization, AuthController.logout);

module.exports = router;
