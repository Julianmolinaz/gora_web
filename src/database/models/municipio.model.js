const { DataTypes } = require("sequelize");
const localConexion = require("../conexiones/local.conexion");

const Municipio = localConexion.define("Municipio", {
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
  modelName: "Municipio",
  tableName: "municipios",
  timestamps: false,
  underscored: true,
});

module.exports = Municipio;
