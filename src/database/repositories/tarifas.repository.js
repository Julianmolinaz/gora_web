const conexion = require("../conexiones/local");

class TarifasRepository {
  static tarifasPorTipoVehiculo(tipoVehiculoId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM tarifas WHERE tipo_vehiculo_id = ${tipoVehiculoId}`;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	resolve(result);
      });
    });
  }
}

module.exports = TarifasRepository;
