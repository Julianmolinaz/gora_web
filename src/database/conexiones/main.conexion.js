const { Sequelize } = require("sequelize");

const main = new Sequelize(
  process.env.MAIN_DB_NAME,
  process.env.MAIN_DB_USER,
  process.env.MAIN_DB_PASS,
  {
    host: process.env.MAIN_DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

module.exports = main;
