const Credito = require("../models/credito.model");

class CreditosRepository {
  static async findBySolicitud(solicitudId) {
    const credito = await Credito.findOne({
      where: { precredito_id: solicitudId }
    });

    return credito;
  }
}

module.exports = CreditosRepository;
