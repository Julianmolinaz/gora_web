const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: process.env.MAIN_DB_HOST,
  port: process.env.MAIN_DB_PORT,
  user: process.env.MAIN_DB_USER,
  database: process.env.MAIN_DB_NAME,
  password: process.env.MAIN_DB_PASS
});

module.exports = conexion;
