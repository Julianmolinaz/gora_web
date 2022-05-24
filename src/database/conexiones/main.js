const mysql = require("mysql2");

console.log("--conectando a db main--");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "goku",
  database: "gora",
  password: "secret"
});

module.exports = conexion;
