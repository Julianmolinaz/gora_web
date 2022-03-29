/*********
 * WEB
 *********/
const HomeWeb = require("./web/home");
const ContactoWeb = require("./web/contacto");

const webRouter = (app) => {
  app.use("/", HomeWeb);
  app.use("/contacto", ContactoWeb);
}

/**********
 * API
 **********/

const SimuladorApi = require("./api/simulador");
const ContactosApi = require("./api/contactos");

const apiRouter = (app) => {
  app.use("/api/simulador", SimuladorApi);
  app.use("/api/contactos", ContactosApi);
}

module.exports = {
  webRouter,
  apiRouter
}
