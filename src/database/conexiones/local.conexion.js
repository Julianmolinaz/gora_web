const { Sequelize } = require("sequelize");

const local = new Sequelize(
  process.env.LOCAL_DB_NAME,
  process.env.LOCAL_DB_USER,
  process.env.LOCAL_DB_PASS,
  { 
    host: process.env.LOCAL_DB_HOST,
    port: process.env.LOCAL_DB_PORT,
    dialect: "mysql",
    logging: false 
  } 
);

local
  .authenticate()
  .then(() => {
    console.log("connection local has been established successfully.");	
  })
  .catch((error) => {
    console.log("Unable to connect to the database: ", error);
  });

module.exports = local;
