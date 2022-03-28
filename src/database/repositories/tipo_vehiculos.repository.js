const conexion = require("../conexiones/local");

class TipoVehiculosRepository {
  static list() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM tipo_vehiculos`;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	resolve(result);
      });
    });
  }
}

module.exports = TipoVehiculosRepository;
