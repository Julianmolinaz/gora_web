const { Sequelize, DataTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

const Documento = main.define("documentos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
  },
  precredito_id: {
    type: DataTypes.INTEGER,
    field: "precredito_id"
  },
  credito_id: {
    type: DataTypes.INTEGER,
  },
  user_create_id: {
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
  modelName: "Documento",
  tableName: "documentos",
  timestamps: false,
  underscored: true,
}); 

module.exports = Documento;
