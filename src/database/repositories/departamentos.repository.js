const Departamento = require("../models/departamento.model");

class DepartamentosRepository {
  static async listDepartamentos() {
    try {
      const departamentos = await Departamento.findAll({
        order: ["nombre"]
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DepartamentosRepository;
