const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

/****************
 * SERVER
 ****************/
const app = express();

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

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const { webRouter, apiRouter } = require("./src/routes");

webRouter(app);
apiRouter(app);

app.use("/*", (req, res) => res.redirect("/errors/403"));

module.exports = { app };
