const { Sequelize, DataTypes } = require("sequelize");
const { capitalizar } = require("../../helpers/getters");
const main = require("../conexiones/main.conexion");

const Cliente = main.define("clientes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
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
  nombre: {
    type: DataTypes.STRING,
  },
  genero: {
    type: DataTypes.ENUM("Femenino", "Masculino"),
    allowNull: false,
  },
  estado_civil: {
    type: DataTypes.ENUM("Soltero/a", "Casado/a", "Separado/a", "Viudo/a", "Union libre"),
    allowNull: false,
  },
  tipo_doc: {
    type: DataTypes.ENUM(
      'Cedula Ciudadanía','Nit','Cedula de Extranjería','Pasaporte',
      'Pase Diplomático','Carnet Diplomático','Tarjeta de Identidad',
      'Rut','Número único de Identificación Personal','Nit de Extranjería'
    ),
    field: "tipo_doc",
    defaultValue: "Cedular Ciudadanía"
  },
  num_doc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_exp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lugar_exp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lugar_nacimiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivel_estudios: {
    type: DataTypes.ENUM("Primaria", "Bachiller", "Tecnico", "Universitario", "Postgrado", "Ninguno"),
  },
  estrato: {
    type: DataTypes.ENUM("1", "2", "3", "4", "5", "6"),  
  },
  meses_residencia: {
    type: DataTypes.INTEGER,
    default: 0,
  },
  tipo_vivienda: {
    type: DataTypes.ENUM("Propia", "Familiar", "Alquilada"),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barrio: {
    type: DataTypes.STRING,
  },
  municipio_id: {
    type: DataTypes.INTEGER,
  },
  movil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fijo: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ocupacion: {
    type: DataTypes.STRING,
  }, 
  cargo: {
    type: DataTypes.STRING,
  },
  descripcion_actividad: {
    type: DataTypes.STRING,
  },
  tipo_actividad: {
    type: DataTypes.ENUM("Dependiente", "Independiente"),
  },
  tipo_contrato: {
    type: DataTypes.ENUM("Indefinido", "Prestacion de servicios", "Termino fijo"),
  },
  empresa: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue("empresa", value.trim());
    }
  },
  doc_empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dir_empresa: {
    type: DataTypes.STRING,
  },
  tel_empresa: {
    type: DataTypes.STRING,
  },
  fecha_vinculacion: {
    type: DataTypes.DATE,
  },
  user_create_id: {
    type: DataTypes.INTEGER,
    defaultValue: process.env.USER_ID_DEFAULT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  version: {
    type: DataTypes.ENUM("1", "2", "3", "4"),
    defaultValue: "4",
  }
}, {
  main,
  modelName: "Cliente",
  underscored: true,
  timestamps: false,
  hooks: {
    beforeSave: (cliente) => {
      cliente.nombre = (
        capitalizar(cliente.primer_nombre.trim()) + ' ' + 
        capitalizar(cliente.segundo_nombre.trim()) + ' ' + 
        capitalizar(cliente.primer_apellido.trim()) + ' ' + 
        capitalizar(cliente.segundo_apellido.trim()) 
      ).replace("  ", " ");
    }
  }
});

module.exports = Cliente;
