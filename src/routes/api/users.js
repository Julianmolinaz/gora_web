const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user.controller");
const { authorization } = require("../../middlewares");

router.get("/tipo-usuario/:num_doc", UserController.getTipoUsuario);
router.post("/register", UserController.register);
router.post("/es-usuario", UserController.esUsuario);
router.post("/", UserController.store);
router.put("/", authorization, UserController.update);

module.exports = router;
