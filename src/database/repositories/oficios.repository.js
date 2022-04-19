const main = require("../conexiones/main");

class OficiosRepository {
  static async listOficios() {
    return new Promise((resolve, reject) => {
      const query = `
          SELECT *
          FROM oficios
          ORDER BY nombre;
        `;
      main.query(query, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }
}

module.exports = OficiosRepository;
