const express = require("express");
const router = express.Router();

router.get("/403", (req, res) => {
  res.render("errors/403.html");
});

module.exports = router;
