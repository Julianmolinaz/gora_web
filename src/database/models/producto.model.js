const { Sequelize, DataTypes } = require("sequelize");

const local = require("../conexiones/local.conexion");

const Producto = local.define("Producto", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.ENUM("Activo", "Inactivo"),
    default: "Activo"
  },
}, {
  local,
  modelName: "Producto",
  timestamps: false
});

module.exports = Producto;
