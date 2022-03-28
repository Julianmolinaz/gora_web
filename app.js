const express = require("express");
const moment = require("moment");
const nunjucks = require("nunjucks");
const cors = require("cors");
const { webRouter, apiRouter } = require("./src/routes");

const app = express();
const PORT = 3001;

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

webRouter(app);
apiRouter(app);

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
