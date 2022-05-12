const Codigo = require("../models/codigo.model");

class CodigosRepository {
  static async crear(data, transaction = null) {
    try {
      const codigo = await Codigo.crear(
        data, { transaction }
      );
      return codigo;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CodigosRepository;
