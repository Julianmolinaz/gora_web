const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../conexiones/local.conexion");

const Factor = sequelize.define("Factor", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  meses: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL,
  },
  grupo: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: "Factor",
  tableName: "factores"
});

module.exports = Factor;
