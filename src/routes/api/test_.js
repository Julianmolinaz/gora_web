const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({msm: "Hola test"});
});

module.exports = router;
