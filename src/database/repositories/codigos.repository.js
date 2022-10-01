const Codigo = require("../models/codigo.model");
const local = require("../conexiones/local");

class CodigosRepository {
  static async crear(data, transaction = null) {
    try {
      const codigo = await Codigo.create(
        data, { transaction }
      );
      return codigo;
    } catch (error) {
      throw error;
    }
  }

  static async findExist(query) {
    const result = await Codigo.findAll({
      where: query
    });
    return result;
  }

  static async findAllSome(query) {
    const result = await Codigo.findAll({ where: query }); 
    return result;
  }

  static async findOneSome(query) {
    const result = await Codigo.findOne({ where: query }); 
    return result;
  }

  static findConfirmado(numDoc, nowDate) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT *
        FROM codigos
        WHERE num_doc = '${numDoc}'
        AND estado = 'CONFIRMADO'
        AND updated_at like '${nowDate}%'
      `;
      local.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }

  static async update(codigoId, data, transaction = null) {
    const result = Codigo.update(data, {
      where: { id: codigoId },
      transaction
    });
    return result;
  }
}

module.exports = CodigosRepository;
