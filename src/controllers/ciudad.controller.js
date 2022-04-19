const CiudadesRepository = require("../database/repositories/ciudades.repository");

class CiudadController {
  static async getPorDepartamento(req, res) {
    const { departamentoId } = req.params;
    const ciudades = await CiudadesRepository.getCiudadesPorDepartamento(
      departamentoId
    );
    return res.json({ ciudades });
  }
}

module.exports = CiudadController;