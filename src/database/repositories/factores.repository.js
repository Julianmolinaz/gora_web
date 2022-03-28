const conexion = require("../conexiones/local");

class FactoresRepository {
  static getFactorPorNumeroCuotas(numMeses) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM factores WHERE meses=${numMeses} LIMIT 1`;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	if (result) resolve(result[0]);
	resolve(result);
      });
    });
  }
}

module.exports = FactoresRepository;
