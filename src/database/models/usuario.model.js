const { DataTypes } = require("sequelize");
const { capitalizar } = require("../../helpers/getters");
const local = require("../conexiones/local.conexion");

const Usuario = local.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  primer_nombre: {
    type: DataTypes.STRING,
    field: "primer_nombre",
    allowNull: false,
    set(value) {
      this.setDataValue("primer_nombre", capitalizar(value.trim()));
    }
  },
  segundo_nombre: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue("segundo_nombre", capitalizar(value.trim()));
    }
  },
  primer_apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("primer_apellido", capitalizar(value.trim()));
    }
  },
  segundo_apellido: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue("segundo_apellido", capitalizar(value.trim()));
    }
  },
  tipo_doc: {
    type: DataTypes.ENUM(
      'Cedula Ciudadanía','Nit','Cedula de Extranjería','Pasaporte',
      'Pase Diplomático','Carnet Diplomático','Tarjeta de Identidad',
      'Rut','Número único de Identificación Personal','Nit de Extranjería'
    ),
    defaultValue: "Cedular Ciudadanía"
  },
  num_doc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
  },
  estado_codigo: {
    type: DataTypes.BOOLEAN,
    default: 0,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
  }
}, {
  modelName: "Usuario",
  tableName: "usuarios",
  underscored: true,
});

module.exports = Usuario;
