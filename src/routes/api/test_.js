const express = require("express");
const authorization = require("./../../middlewares/authorization");
const { NotificarSolicitudAnalisis } = require("../../services/notificaciones");
const router = express.Router();

router.get("/", async (req, res) => {
  const useCase = new NotificarSolicitudAnalisis("9873241");
  await useCase.execute().then((result) => {
    res.send({result});
  }).catch(err => res.send({err: err.stack}));
});

router.get("/:solicitudId", authorization, (req, res) => {
  res.json({msm: "param solicitud"});
});

module.exports = router;
