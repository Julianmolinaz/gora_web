const { Sequelize } = require("sequelize");

console.log("--conectando a db conexion.local--");

const local = new Sequelize(
  process.env.LOCAL_DB_NAME,
  process.env.LOCAL_DB_USER,
  process.env.LOCAL_DB_PASS,
  { 
    host: process.env.LOCAL_DB_HOST,
    dialect: "mysql",
    logging: false 
  } 
);

local.authenticate().then((errors) => {
  if (errors) {
    console.log({errors});
  }
});

module.exports = local;
