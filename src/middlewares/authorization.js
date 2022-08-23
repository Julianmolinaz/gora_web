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
    
    req.body.usuarioId_ = data.id;
    req.body.nombre_ = data.nombre;
    req.body.clienteId_ = data.ref;
    return next();
  } catch {
    const origin = req.originalUrl.split("/");

    if (origin[1] === "api") {
      return res.sendStatus(403);
    } else {
      return res.redirect("/errors/403");
    }
  }
}

module.exports = authorization;
