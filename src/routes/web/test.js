const express = require("express");
const authorization = require("./../../middlewares/authorization");

const router = express.Router();

router.get("/", authorization, (req, res) => {
  res.json({msm: "Hola test"});
});

router.get("/:solicitudId", authorization, (req, res) => {
  res.json({msm: "param solicitud"});
});

module.exports = router;
