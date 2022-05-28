const verifyToken = require("./verify_token");

/*********
 * WEB
 *********/
const webRouter = (app) => {
  app.use("/", require("./web/home"));
  app.use("/contacto", require("./web/contacto"));
  app.use("/nosotros", require("./web/nosotros"));
  app.use("/solicitudes", require("./web/solicitudes"));
}

/**********
 * API
 **********/
const apiRouter = (app) => {
  app.use("/api/test", verifyToken, require("./api/test_")),
  app.use("/api/auth", require("./api/auth")),
  app.use("/api/clientes", require("./api/clientes"));
  app.use("/api/contactos", require("./api/contactos"));
  app.use("/api/municipios", require("./api/municipios"));
  app.use("/api/referencias", require("./api/referencias"));
  app.use("/api/simulador", require("./api/simulador"));
  app.use("/api/solicitudes", require("./api/solicitudes"));
  app.use("/api/terminos", require("./api/terminos"));
  app.use("/api/usuarios", require("./api/usuarios"));
}

module.exports = {
  webRouter,
  apiRouter
}
