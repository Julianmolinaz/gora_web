const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const appKey = process.env.TOKEN_SECRET;

const authorization = (req, res, next) => {
  console.log("authorization");
  const token = req.cookies.access_token;

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(token, appKey);
    req.body.usuarioId = data.id;
    req.body.nombre = data.nombre;
    return next();
  } catch {
    return res.sendStatus(403);
  }
}

module.exports = authorization;
