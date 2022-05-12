const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../conexiones/local.conexion");

const Codigo = sequelize.define("Codigo", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    field: "usuario_id",
  },
  codigo: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.ENUM("PROCESO", "CONFIRMADO"),
  },
  concepto: {
    type: DataTypes.ENUM("TERMINOS", "PAGARE"),
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
  }
}, {
  sequelize,
  modelName: "Codigo",
  underscored: false,
});

module.exports = Codigo;
