const express = require("express");
const rateLimit = require("express-rate-limit");

/**
 * Limita el número de intentos permitidos
 *
 **/

const NUM_INTENTOS = 5;

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: NUM_INTENTOS,
  message: "Ha exedido el número de intentos permitido, inténtalo mas tarde",
  standarHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;

