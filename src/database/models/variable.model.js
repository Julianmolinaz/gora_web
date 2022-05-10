const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../conexiones/local.conexion");

const Variable = sequelize.define("Variable", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalle: {
    type: DataTypes.JSON,
  },
}, {
  sequelize,
  modelName: "Variable",
  timestamps: false,
});

module.exports = Variable;
