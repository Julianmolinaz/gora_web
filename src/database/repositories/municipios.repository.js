const Municipio = require("../models/municipio.model"); 

class MunicipiosRepository {
  static async getMunicipiosPorDepartamento(departamentoId) {
    try {
      const municipios = await Municipio.findAll({
        where: { departamento_id: departamentoId },
        order: ["nombre"],
      });
      return municipios;
    } catch (error) {
      throw error;
    }
  }
  static async getAll() {
    try {
      const municipios = await Municipio.findAll();
      return municipios;
    }
    catch (err) {
      throw err;
    }
  }
}

module.exports = MunicipiosRepository;
