const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const appKey = process.env.TOKEN_SECRET;

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(token, appKey);
    console.log(data);
    req.userId = data.id;
    req.nombre = data.nombre;
    return next();
  } catch {
    return res.sendStatus(403);
  }
}

module.exports = authorization;
