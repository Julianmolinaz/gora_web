const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../conexiones/local.conexion");

const Producto = sequelize.define("Producto", {
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
  sequelize,
  modelName: "Producto",
  timestamps: false
});

module.exports = Producto;
