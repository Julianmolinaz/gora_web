const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../conexiones/local.conexion");

const Codigo = sequelize.define("Codigo", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  codigo: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.ENUM("PROCESO", "CONFIRMADO"),
  },
  num_doc: {
    type: DataTypes.ENUM("TERMINOS", "PAGARE"),
  },
  movil: {
    type: DataTypes.STRING,
    allowNull: false,
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
