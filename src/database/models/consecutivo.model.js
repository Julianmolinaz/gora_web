const { Sequelize, DataTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

const Consecutivo = main.define("Consecutivo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  componente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prefijo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  incrementable: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: "consecutivos",
});

module.exports = Consecutivo;
