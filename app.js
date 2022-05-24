const express = require("express");
//const moment = require("moment");
const nunjucks = require("nunjucks");
const cors = require("cors");
require("dotenv").config();

/****************
 * SERVER
 ****************/
const app = express();
module.exports = { app };

/***************************
 * TEMPLATE ENGINE NUNJUCKS
 ***************************/
app.engine("html", nunjucks.render);
app.set("view engine", "html");

nunjucks.configure("./src/views", {
  autoescape: true,
  cache: false,
  express: app,
});

/****************
 * STATIC FILES
 ****************/
app.use(express.static(__dirname + "/public"));

/**************
 * MIDDLEWARES
 **************/
const { webRouter, apiRouter } = require("./src/routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

webRouter(app);
apiRouter(app);

