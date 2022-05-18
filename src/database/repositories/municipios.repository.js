const Municipio = require("../models/municipio.model"); 

class MunicipiosRepository {
  static async getMunicipiosPorDepartamento(departamentoId) {
    try {
      const municipios = await Muncipio.findAll({
        where: { departamento_id: departamentoId },
        order: ["nombre"],
      });
      return municipios;
    } catch (error) {
      throw error;
    }
  }
  static async getAll() {
    console.log("municipios get all");
    try {
      const municipios = await Municipio.findAll();
      console.log(municipios);
      return municipios;
    }
    catch (err) {
      throw err;
    }
  }
}

module.exports = MunicipiosRepository;
