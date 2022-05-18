const express = require("express");
const moment = require("moment");
const nunjucks = require("nunjucks");
require("dotenv").config();
const local = require("./src/database/conexiones/local.conexion"); 
const main = require("./src/database/conexiones/main.conexion"); 
const cors = require("cors");

/****************
 * SERVER
 ****************/
const app = express();
app.use(cors());

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
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

webRouter(app);
apiRouter(app);

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
