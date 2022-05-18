const { Sequelize } = require("sequelize");

const local = new Sequelize(
  process.env.LOCAL_DB_NAME,
  process.env.LOCAL_DB_USER,
  process.env.LOCAL_DB_PASS,
  { 
    host: process.env.LOCAL_DB_HOST,
    dialect: "mysql",
    logging: true 
  } 
);

module.exports = local;
