const { DataTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

const Referencia = main.define("Referencia", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentesco: {
    type: DataTypes.ENUM(
      'Padre','Madre','Hermano/a','Tio/a','Nieto/a','Suegro/a','Cuado/a','Primo/a','Sobrino/a','Abuelo/a','Hijo/a','Yerno','Nuera'
    ),
    allowNull: false,
  },
  direccion: DataTypes.STRING,
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precredito_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  observaciones: {
    type: DataTypes.TEXT,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  }
}, {
  modelName: "Referencia",
  tableName: "referencias",
  timestamps: false,
  underscored: true,
});

module.exports = Referencia;
