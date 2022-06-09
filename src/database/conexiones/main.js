const mysql = require("mysql2");

console.log("--conectando a db main--");

const conexion = mysql.createConnection({
  host: process.env.MAIN_DB_HOST,
  user: process.env.MAIN_DB_USER,
  database: process.env.MAIN_DB_NAME,
  password: process.env.MAIN_DB_PASS
});

module.exports = conexion;
