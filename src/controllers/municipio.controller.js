const MunicipiosRepository = require("../database/repositories/municipios.repository");

class MunicipioController {
  static async getPorDepartamento(req, res) {
    const { departamentoId } = req.params;
    const municipios = await MunicipiosRepository.getMunicipiosPorDepartamento(
      departamentoId
    );
    return res.json({ municipios });
  }

  static async list(req, res) {
    try {
      const municipios = await MunicipiosRepository.getAll();
      return res.json({ municipios });
    } catch (err) {
      return res.json({ err });
    }
  }
}

module.exports = MunicipioController;
