const Consecutivo = require("../models/consecutivo.model");

class ConsecutivosRepository {
  static async find(consecutivoId) {
    const consecutivo = await Consecutivo.findByPk(consecutivoId); 
    return consecutivo;
  }

  static async update(data, consecutivoId) {
    await Consecutivo.update(data, {
      where: { id: consecutivoId },
    });
  }
}

module.exports = ConsecutivosRepository;
