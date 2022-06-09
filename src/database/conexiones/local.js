const mysql = require("mysql2");

console.log("--conectando a db local--");

const conexion = mysql.createConnection({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  database: process.env.LOCAL_DB_NAME,
  password: process.env.LOCAL_DB_PASS
});

module.exports = conexion;
