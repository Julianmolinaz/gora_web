const conexion = require("../conexiones/local");

class CiudadesRepository {
  static getCiudadesPorDepartamento(departamentoId) {
    return new Promise((resolve, reject) => {
      const query = `
	SELECT *
	FROM municipios 
	WHERE departamento_id = ${departamentoId}
	ORDER BY nombre
      `;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	resolve(result);
      });
    });
  }
}

module.exports = CiudadesRepository;
