const { DataTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

const Venta = main.define("ventas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precredito_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehiculo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
}, {
  main,
  modelName: "Venta",
  underscored: true,
  timestamps: false,
});

module.exports = Venta;
