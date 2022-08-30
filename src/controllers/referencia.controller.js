const CrearReferencias = require("../services/referencias/crear_referencias.js"); 
const ActualizarReferencias = require("../services/referencias/actualizar_referencias.js"); 
const ReferenciasRepository = require("../database/repositories/referencias.repository.js"); 

class ReferenciaController {
  static async create(req, res) {
    const solicitudId = req.params.solicitudId;
    const ltParentesco = await ReferenciasRepository.getEnumValues('parentesco');
    const response = {
      ltParentesco,
      solicitudId,
      referencias: [],
      estado: "crear"
    };
    return res.render("referencias/create.html", response);   
  }

  static async storeMultiple(req, res) { console.log("storeMultiple");
    const solicitudId = req.params.solicitudId;
    const { referencias } = req.body;
    try {
      const crearReferencias = new CrearReferencias(
        referencias,
        solicitudId
      );
      await crearReferencias.exec();

      return res.status(201).json({
        msg: "Se han creado las referencias exitosamente"
      });
    } catch (error) {
      console.error(error);
      // organizar las validaciones
      return res.status(400).json({ error }); 
    }
  }

  static async edit(req, res) {
    const solicitudId = req.params.solicitudId;
    const ltParentesco = await ReferenciasRepository.getEnumValues('parentesco');
    const referencias_ = await ReferenciasRepository.findSolicitud(solicitudId); 
    const referencias = referencias_.map((ref) => {
      return {
        id: ref.id,
        nombre: ref.nombre,
        parentesco: ref.parentesco,
        celular: ref.celular
      }
    });

    return res.render("referencias/create.html", {
      ltParentesco,
      solicitudId,
      referencias,
      estado: "editar"
    });
  }

  static async updateMultiple(req, res) {
    const { solicitudId } = req.params;
    const { referencias } = req.body;

    console.log({referencias});
    try {
      const actualizarReferencias = new ActualizarReferencias(
        referencias,
        solicitudId
      );
      await actualizarReferencias.exec();

      return res.status(201).json({
        msg: "Se han actualizado las referencias exitosamente"
      });
    } catch (error) {
      console.error(error);
      // organizar las validaciones
      return res.status(400).json({ error }); 
    }
  }
}

module.exports = ReferenciaController;
