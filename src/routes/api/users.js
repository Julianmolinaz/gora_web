const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user.controller");
const { authorization } = require("../../middlewares");

router.post("/es-usuario", UserController.esUsuario);
router.post("/", UserController.store);
router.put("/", authorization, UserController.update);

module.exports = router;
