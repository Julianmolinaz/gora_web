const mainConexion = require("../conexiones/main"); 
const { getEnum } = require("./../../helpers/getters");

class SolicitudesRepository {
  static getPeriodos() {
    return new Promise((resolve, reject) => {
      const query = `
	SELECT column_type
	FROM information_schema.columns
	WHERE table_name = "precreditos"
	AND column_name = "periodo"
      `;

      mainConexion.query(query, (error, result) => {
	if (error) reject(error);
	resolve(getEnum(result[0].COLUMN_TYPE));
      });
    });
  }
}

module.exports = SolicitudesRepository;
