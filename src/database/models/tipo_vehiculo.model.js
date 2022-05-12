const { Sequelize, DataTypes } = require("sequelize");
const local = require("../conexiones/local.conexion");

const TipoVehiculo = local.define("TipoVehiculo", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM("Activo", "Inactivo"),
    default: "Activo"
  },
}, {
  local,
  modelName: "TipoVehiculo",
  tableName: "tipo_vehiculos",
  timestamps: false
});

module.exports = TipoVehiculo;
