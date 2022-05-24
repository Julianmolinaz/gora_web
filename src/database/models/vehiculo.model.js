const { DataTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

const Vehiculo = main.define("Vehiculo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  placa: {
    type: DataTypes.STRING,
  },
  modelo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cilindraje: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vencimiento_soat: {
    type: DataTypes.DATE,
  },
  vencimiento_rtm: {
    type: DataTypes.DATE,
  },
  tipo_vehiculo_id: {
    type: DataTypes.INTEGER,
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
  modelName: "Vehiculo",
  underscored: true,
  timestamps: false,
});

module.exports = Vehiculo;
