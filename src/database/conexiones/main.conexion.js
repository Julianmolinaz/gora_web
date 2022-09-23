const { Sequelize } = require("sequelize");

const main = new Sequelize(
  process.env.MAIN_DB_NAME,
  process.env.MAIN_DB_USER,
  process.env.MAIN_DB_PASS,
  {
    port: process.env.MAIN_DB_PORT,
    host: process.env.MAIN_DB_HOST,
    port: process.env.MAIN_DB_PORT,
    dialect: "mysql",
    logging: false
  }
);

main
  .authenticate()
  .then(() => {
    console.log("connection main has been established successfully.");	
  })
  .catch((error) => {
    console.log("Unable to connect to the database: ", error);
  });
module.exports = main;
