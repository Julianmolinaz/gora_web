const Solicitud = require("../models/solicitud.model");
const mysqlMain = require("../conexiones/main");

class SolicitudesRepository {
  static getPeriodos() {
    try {
      const periodos = Solicitud.rawAttributes.periodo.values;
      return periodos;
    } catch (error) {
      throw error;
    }
  }

  static async findSolicitudesActivasByCliente(clienteId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT precreditos.* 
        FROM precreditos
        LEFT JOIN creditos on precreditos.id = creditos.precredito_id
        WHERE precreditos.cliente_id = clienteId
        AND precreditos.aprobado IN ('En estudio', 'Si')
        AND creditos.id IS NULL
      `;
      mysqlMain.query(sql, (err, result) => {
        if (err) reject(erro);
        resolve(result);
      });
    });
  }
}

module.exports = SolicitudesRepository;
