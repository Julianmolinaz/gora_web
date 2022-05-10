const { encriptar } = require("../../helpers/setters");

const sequelize = require("../conexiones/local.conexion");

const Tarifa = sequelize.define("Tarifa", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  estado: {
    type: DataTypes.ENUM("Activo", "Inactivo"),
    default: "Activo"
  },
  codigo: {
    type: DataTypes.STRING,
  },
  clase: {
    type: DataTypes.STRING,
  },
  regla: {
    type: DataTypes.STRING,
  },
  peso: {
    type: DataTypes.ENUM("Motos", "Livianos", "Pesados"),
  },
  valor1: {
    type: DataTypes.DOUBLE,
  },
  valor2: {
    type: DataTypes.DOUBLE,
  },
  tipo_vehiculo_id: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  modelName: "Tarifa",
});

module.exports = Tarifa;
