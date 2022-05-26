const { DataTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

const Estudio = main.define("Estudio", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cliente_id: DataTypes.INTEGER,
  codeudor_id: DataTypes.INTEGER,
  funcionario_id: {
    type: DataTypes.INTEGER,
    defaultValue: process.env.USER_ID_DEFAULT,
  },
  estDatacredito_id: DataTypes.INTEGER,
  estLaboral_id: DataTypes.INTEGER,
  estVivienda_id: DataTypes.INTEGER,
  estReferencia_id: DataTypes.INTEGER,
  cal_asesor: DataTypes.DOUBLE,
  cal_estudio: DataTypes.DOUBLE,
  observaciones: DataTypes.TEXT,
  user_create_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_update_id: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  }
  ref_1: { 
    type: DataTypes.TEXT
  },
  ref_2: { 
    type: DataTypes.TEXT
  },
  ref_3: { 
    type: DataTypes.TEXT
  },
  ref_4: { 
    type: DataTypes.TEXT
  }
}, {
  modelName: "Estudio",
  tableName: "estudios",
  timestamps: false,
  underscored: true,
});

module.exports = Estudio;
