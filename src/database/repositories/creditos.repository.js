const Credito = require("../models/credito.model");
const { QueryTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

class CreditosRepository {
  static async findBySolicitud(solicitudId) {
    const sql = `
      SELECT
        creditos.*,
        fecha_cobros.fecha_pago 
        FROM creditos
        INNER JOIN fecha_cobros ON creditos.id = fecha_cobros.credito_id
        WHERE creditos.precredito_id = ${solicitudId}
    `;

    const credito = await main.query(sql, { type: QueryTypes.SELECT });

    return credito ? credito[0] :  null;
  }
}

module.exports = CreditosRepository;
