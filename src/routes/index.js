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
  app.use("/api/simulador", require("./api/simulador"));
  app.use("/api/contactos", require("./api/contactos"));
  app.use("/api/clientes", require("./api/clientes"));
  app.use("/api/solicitudes", require("./api/solicitudes"));
  app.use("/api/ciudades", require("./api/ciudades"));
}

module.exports = {
  webRouter,
  apiRouter
}
