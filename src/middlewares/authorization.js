const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const SolicitudesRepository = require("../database/repositories/solicitudes.repository");

const appKey = process.env.TOKEN_SECRET;

const authorization = async (req, res, next) => {
  

  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw "Sesión no existe";
    }
    const data = jwt.verify(token, appKey);

    // Valida si la solicitud le pertenece al usuario
    if (!!req.params.solicitudId) {
      const { solicitudId } = req.params;
      const solicitud = await SolicitudesRepository.findWithIdAndCliente(
        solicitudId, data.ref 
      );
      if (!!!solicitud) {
        throw "Error en validación";
      }
    }
    
    req.body.usuarioId = data.id;
    req.body.nombre = data.nombre;
    req.body.clienteId = data.ref;
    return next();
  } catch {
    console.log(req.originalUrl);
    const origin = req.originalUrl.split("/");

    if (origin[1] === "api") {
      return res.sendStatus(403);
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = authorization;
