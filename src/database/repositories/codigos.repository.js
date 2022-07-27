const Codigo = require("../models/codigo.model");

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

  static async update(codigoId, data, transaction = null) {
    const result = Codigo.update(data, {
      where: { id: codigoId },
      transaction
    });
    return result;
  }
}

module.exports = CodigosRepository;
