const Referencia = require("../models/referencia.model");

class ReferenciasRepository {
  static async getEnumValues(campo) {
    const items = await Referencia.getAttributes()[campo].values;
    return items;
  }

  static async crear(data, transaction = null) {
    try {
      const referencia = await Referencia.create(
        data,
        { transaction }
      );
    } catch (err) {
      throw err;
    }
  }
  static async eliminarTodo() {
    await Referencia.destroy({ where: {} });
  }
}

module.exports = ReferenciasRepository;
