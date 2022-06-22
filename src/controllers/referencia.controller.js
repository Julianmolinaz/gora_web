const CrearReferencias = require("../services/referencias/crear_referencias.js"); 
const ReferenciasRepository = require("../database/repositories/referencias.repository.js"); 

class ReferenciaController {
  static async create(req, res) {
    const ltParentesco = await ReferenciasRepository.getEnumValues('parentesco');
    return res.render("referencias/create.html", { ltParentesco });   
  }

  static async storeMultiple(req, res) {
    const { referencias, clienteId, solicitudId } = req.body;
    try {
      const crearReferencias = new CrearReferencias(
        referencias,
        clienteId,
        solicitudId
      );
      await crearReferencias.exec();
      return res.status(200).json({
        msg: "Se han creado las referencias exitosamente"
      });
    } catch (error) {
      return res.status(400).json({ error }); 
    }
  }
}

module.exports = ReferenciaController;
