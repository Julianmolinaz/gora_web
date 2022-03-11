/*********
 * WEB
 *********/
const HomeWeb = require("./web/home");

const webRouter = (app) => {
  app.use("/", HomeWeb);
}

/**********
 * API
 **********/

const apiRouter = (app) => {
  //
}

module.exports = {
  webRouter,
  apiRouter
}
