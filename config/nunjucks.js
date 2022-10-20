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
    .addGlobal('MSEC_LOAD_DOC', process.env.MSEC_LOAD_DOC)
    .addGlobal('MY_CONTACT_NUMBER', process.env.MY_CONTACT_NUMBER)
    .addGlobal('GORA_RAZON_SOCIAL', process.env.GORA_RAZON_SOCIAL)
    .addGlobal('GORA_TELEFONO_1', process.env.GORA_TELEFONO_1)
    .addGlobal('GORA_TELEFONO_2', process.env.GORA_TELEFONO_2)
    .addGlobal('GORA_DIRECCION', process.env.GORA_DIRECCION)
    .addGlobal('ddmmyyyy', (date) => ddmmyyyy(date))
    .addGlobal('currency', (amount) => currency(amount));
}

module.exports = jucks;
