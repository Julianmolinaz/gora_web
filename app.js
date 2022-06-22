const express = require("express");
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
require("./config/nunjucks.js")(app);

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

module.exports = { app };
