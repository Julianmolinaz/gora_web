const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../conexiones/local.conexion");

const Contacto = sequelize.define("Contacto", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  municipio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.INTEGER,
  },
  telefono1: {
    type: DataTypes.STRING,
  },
  telefono2: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  localizacion: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: "Contacto",
  timestamps: false,
});

module.exports = Contacto;
