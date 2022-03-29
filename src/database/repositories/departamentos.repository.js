const conexion = require("../conexiones/local");

class DepartamentosRepository {
  static listDepartamentos() {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, nombre FROM departamentos ORDER BY nombre`;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	resolve(result);
      });
    });
  }
}

module.exports = DepartamentosRepository;
