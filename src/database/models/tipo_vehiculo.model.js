const { encriptar } = require("../../helpers/setters");

const sequelize = require("../conexiones/local.conexion");

const TipoVehiculo = sequelize.define("TipoVehiculo", {
  id: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM("Activo", "Inactivo"),
    default: "Activo"
  },
}, {
  sequelize,
  modelName: "TipoVehiculo",
  timestamps: false
});

module.exports = TipoVehiculo;
