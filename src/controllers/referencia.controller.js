const CrearReferencias = require("../services/referencias/crear_referencias.js"); 

class ReferenciaController {
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
