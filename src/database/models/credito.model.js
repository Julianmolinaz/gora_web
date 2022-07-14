const { DataTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

const Credito = main.define("Credito", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  precredito_id: DataTypes.INTEGER,
  cuotas_faltantes: DataTypes.INTEGER,
  saldo: DataTypes.DOUBLE,
  saldo_favor: DataTypes.DOUBLE,
  estado: DataTypes.ENUM('Al dia','Mora','Prejuridico','Juridico','Cancelado','Cancelado por refinanciacion'),
  rendimiento: DataTypes.DOUBLE,
  valor_credito: DataTypes.DOUBLE,
  castigada: DataTypes.ENUM('Si', 'No'),
  refinanciacion: DataTypes.ENUM('Si', 'No'),
  credito_refinanciado_id: DataTypes.INTEGER,
  last_llamada_id: DataTypes.INTEGER,
  sanciones_debe: DataTypes.INTEGER,
  sanciones_ok: DataTypes.INTEGER,
  sanciones_exoneradas: DataTypes.INTEGER,
  mes: DataTypes.INTEGER,
  anio: DataTypes.INTEGER,
  calificacion: DataTypes.ENUM('BB','B','M','MM','CASTIGADA'),
  permitir_mover_fecha: DataTypes.BOOLEAN,
  recordatorio: DataTypes.STRING,
  user_create_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_update_id: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updated_at: {
    field: "updated_at",
    type: DataTypes.DATE,
    defaultValue: new Date(),
  }
}, {
  modelName: "Credito",
  tableName: "creditos",
  timestamps: false,
  underscored: true,
});

module.exports = Credito;
