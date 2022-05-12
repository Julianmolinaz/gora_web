const Variable = require("../models/variable.model");

class VariablesRepository {
  static async getEmpresa() {
    try {
      const empresa = await Variable.findOne({
        attributes: ["detalle"],
        where: { nombre: "empresa" }
      });
      return empresa;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VariablesRepository;
