const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user.controller");
const { authorization } = require("../../middlewares");

router.post("/", UserController.store);
router.put("/", authorization, UserController.update);
router.post("/register", UserController.register);
router.post("/es-usuario", UserController.esUsuario);
router.post("/validate-code", authorization, UserController.validateUserCode)
router.get("/tipo-usuario/:num_doc", UserController.getTipoUsuario);

module.exports = router;
