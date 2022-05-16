const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "goku",
  database: "local",
  password: "secret"
});

module.exports = conexion;
