const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../conexiones/local.conexion");

const Municipio = sequelize.define("Municipio", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  condigo: {
    type: DataTypes.INTEGER,
  },
  departamento_id: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  modelName: "Municipio",
  timestamps: false
});

module.exports = Municipio;
