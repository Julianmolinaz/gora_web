const CrearSolicitudCompleta = require("../services/solicitudes/crear_solicitud_completa");

class SolicitudController {
  static create(req, res) {
    return res.render("solicitud/index.html");
  }
  
  static async store(req, res) {
    //     
  }

  static async storeWithCliente(req, res) {
    try {
      const { cliente, simulador } = req.body;

      const useCase = new CrearSolicitudCompleta(cliente, simulador);
      await useCase.exec();

      return res.json({ 
        msg: "Cliente creado exitosamente",
        dat: {
          clienteId: useCase.cliente.id, 
          solicitudId: useCase.solicitud.id,
        }
      });
    } catch (error) {
      console.error({ error });
      return res.json({ error }); 
    }
  }
}

module.exports = SolicitudController;
