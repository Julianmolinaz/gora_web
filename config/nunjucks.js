const nunjucks = require("nunjucks");
const moment = require("moment");

/***************************
 * TEMPLATE ENGINE NUNJUCKS
 ***************************/
const jucks = (app) => {
  app.engine("html", nunjucks.render);
  app.set("view engine", "html");

  const envNun = nunjucks.configure("./src/views", {
    autoescape: true,
    cache: false,
    express: app,
  })
    .addGlobal('HOST', process.env.HOST)
    .addGlobal('CANTIDAD_REFS', process.env.CANTIDAD_REFS)
    .addGlobal('ddmmyyyy', (date) => moment(date).format('DD-MM-YYYY'));
}

module.exports = jucks;
