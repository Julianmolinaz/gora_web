const nunjucks = require("nunjucks");
const { currency, ddmmyyyy } = require("../src/helpers/getters");
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
    .addGlobal('SEG_CODIGO_TERMINOS', process.env.SEG_CODIGO_TERMINOS)
    .addGlobal('ddmmyyyy', (date) => ddmmyyyy(date))
    .addGlobal('currency', (amount) => currency(amount))
    .addGlobal('MSEC_LOAD_DOC', process.env.MSEC_LOAD_DOC);
}

module.exports = jucks;
