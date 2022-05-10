const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../conexiones/local.conexion");

const Codigo = sequelize.define("Codigo", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  codigo: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.ENUM("PROCESO", "CONFIRMADO"),
  },
  concepto: {
    type: DataTypes.ENUM("TERMINOS", "PAGARE"),
  }
}, {
  sequelize,
  modelName: "Codigo"
});

module.exports = Codigo;
