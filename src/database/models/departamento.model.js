const { Sequelize, DataTypes } = require("sequelize");

const local = require("../conexiones/local.conexion");

const Departamento = local.define("departamentos", {
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
    type: DataTypes.STRING,
  }
}, {
  local,
  modelName: "Departamento",
  table: "departamentos",
  timestamps: false
});

module.exports = Departamento;
