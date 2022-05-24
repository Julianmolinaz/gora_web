const mysql = require("mysql2");

console.log("--conectando a db local--");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "goku",
  database: "local",
  password: "secret"
});

module.exports = conexion;
