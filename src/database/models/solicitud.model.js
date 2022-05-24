const { Sequelize, DataTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

const Solicitud = main.define("Solicitud", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
  meses: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  cuotas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vlr_cuota: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  p_fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  s_fecha: {
    type: DataTypes.STRING,
  },
  estudio: {
    type: DataTypes.ENUM("Tipico", "Domicilio", "Sin estudio"),
    allowNull: false,
  },
  cuota_inicial: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  aprobado: {
    type: DataTypes.ENUM("Si", "No", "En estudio", "Desistio"),
    defaultValue: "En estudio",
  },
  observaciones: {
    type: DataTypes.TEXT,
  },
  version: {
    type: DataTypes.ENUM("1", "2", "3", "4"),
  },
  user_create_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_update_id: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updated_at: {
    field: "updated_at",
    type: DataTypes.DATE,
    defaultValue: new Date(),
  }
}, {
  main,
  modelName: "Solicitud",
  tableName: "precreditos",
  timestamps: false,
  underscored: true,
});

module.exports = Solicitud;
