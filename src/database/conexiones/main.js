const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "goku",
  database: "gora",
  password: "secret"
});

module.exports = conexion;
