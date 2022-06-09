const { Sequelize, DataTypes } = require("sequelize");
const { encriptar } = require("../../helpers/bcrypt");
const local = require("../conexiones/local.conexion");

const Tarifa = local.define("tarifas", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  estado: {
    type: DataTypes.ENUM("Activo", "Inactivo"),
    default: "Activo"
  },
  codigo: {
    type: DataTypes.STRING(3),
  },
  clase: {
    type: DataTypes.STRING,
  },
  regla: {
    type: DataTypes.STRING,
  },
  peso: {
    type: DataTypes.ENUM("Motos", "Livianos", "Pesados"),
  },
  valor1: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor2: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  tipo_vehiculo_id: {
    type: DataTypes.INTEGER,
    field: "tipo_vehiculo_id",
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
  local,
  modelName: "Tarifa",
  tableName: "tarifas",
  underscored: false,
});

module.exports = Tarifa;
