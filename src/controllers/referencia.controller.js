const CrearReferencias = require("../services/referencias/crear_referencias.js"); 
const ReferenciasRepository = require("../database/repositories/referencias.repository.js"); 

class ReferenciaController {
  static async create(req, res) {
    const solicitudId = req.params.solicitudId;
    const ltParentesco = await ReferenciasRepository.getEnumValues('parentesco');
    return res.render("referencias/create.html", { 
      ltParentesco,
      solicitudId
    });   
  }

  static async storeMultiple(req, res) {
    const solicitudId = req.params.solicitudId;
    const { referencias } = req.body;
    try {
      const crearReferencias = new CrearReferencias(
        referencias,
        solicitudId
      );
      await crearReferencias.exec();

      return res.status(200).json({
        msg: "Se han creado las referencias exitosamente"
      });
    } catch (error) {
      console.error(error);
      // organizar las validaciones
      return res.status(400).json({ error }); 
    }
  }
}

module.exports = ReferenciaController;
