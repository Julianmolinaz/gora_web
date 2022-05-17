const { Sequelize, DataTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

const Solicitud = main.define("Solicitud", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  num_fact: {
    type: DataTypes.STRING,
  },
  fecha: {
    type: DataTypes.DATE,
  },
  cartera_id: {
    type: DataTypes.INTEGER,
  },
  funcionario_id: {
    type: DataTypes.INTEGER,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
  },
  vlr_fin: {
    type: DataTypes.FLOAT,
  },
  periodo: {
    type: DataTypes.ENUM("Quincenal", "Mensual"),
    allowNull: false,
  },
  created_at: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updated_at: {
    field: "updated_at",
    type: DataTypes.DATE,
  }
}, {
  main,
  modelName: "Solicitud",
  tableName: "precreditos",
  timestamps: false,
  underscored: false,
});

module.exports = Solicitud;
