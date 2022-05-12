const Ciudad = require("../models/ciudad.model"); 

class CiudadesRepository {
  static async getCiudadesPorDepartamento(departamentoId) {
    try {
      const ciudades = Ciudad.findAll({
        where: { departamento_id: departamentoId },
        order: ["nombre"],
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CiudadesRepository;
