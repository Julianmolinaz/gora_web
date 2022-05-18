const { Sequelize, DataTypes } = require("sequelize");
const localConexion = require("../conexiones/local.conexion");

const Municipio = localConexion.define("municipios", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  codigo: {
    type: DataTypes.INTEGER,
  },
  departamento_id: {
    type: DataTypes.INTEGER,
  },
}, {
  localConexion,
  modelName: "Municipio",
  timestamps: false,
  underscored: true,
});

module.exports = Municipio;
