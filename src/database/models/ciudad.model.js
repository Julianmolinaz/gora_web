const { Sequelize, DataTypes } = require("sequelize");
const local = require("../conexiones/local.conexion");

const Ciudad = local.define("Ciudad", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  condigo: {
    type: DataTypes.INTEGER,
  },
  departamento_id: {
    type: DataTypes.INTEGER,
  },
}, {
  local,
  modelName: "Ciudad",
  tableName: "municipios",
  timestamps: false
});

module.exports = Ciudad;
