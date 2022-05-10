const { Sequelize, DataTypes } = require("sequelize");
const { capitalizar } = require("../../helpers/getters");
const { encriptar } = require("../../helpers/setters");

const sequelize = require("../conexiones/local.conexion");

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  primer_nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      capitalizar(value.trim());
    }
  },
  segundo_nombre: {
    type: DataTypes.STRING,
    set(value) {
      capitalizar(value.trim());
    }
  },
  primer_apellido: {
    type: DataTypes.STRING,
    set(value) {
      capitalizar(value.trim());
    }
  },
  segundo_apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      capitalizar(value.trim());
    }
  },
  tipo_doc: {
    type: DataTypes.ENUM('Cedula Ciudadanía','Nit','Cedula de Extranjería','Pasaporte','Pase Diplomático','Carnet Diplomático','Tarjeta de Identidad','Rut','Número único de Identificación Personal','Nit de Extranjería'),
    defaultValue: "Cedular Ciudadanía"
  },
  num_doc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  movil: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      encriptar(value.trim());
    }
  }
}, {
  sequelize,
  modelName: "Usuario"
});

module.exports = Usuario;


