const conexion = require("../conexiones/local"); 

class VariablesRepository {
  static getEmpresa() {
    return new Promise((resolve, reject) => {
      const query = `SELECT detalle from variables WHERE nombre = "empresa"`;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	if (result) resolve(result[0].detalle);
	else resolve(result);
      });
    });
  }
}

module.exports = VariablesRepository;
