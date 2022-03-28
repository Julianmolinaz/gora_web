const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "local",
  password: "swnamy9873241M;"
});

module.exports = conexion;
