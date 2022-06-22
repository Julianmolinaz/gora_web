const nunjucks = require("nunjucks");

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
    .addGlobal('PORT', process.env.PORT);
}

module.exports = jucks;
