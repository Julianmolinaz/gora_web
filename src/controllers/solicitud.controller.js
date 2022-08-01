const CrearSolicitudCompleta = require("../services/solicitudes/crear_solicitud_completa");
const { Error } = require("../errors");
const { getAccessToken } = require("./../helpers/getters");

class SolicitudController {
  static create(req, res) {
    return res.render("solicitud/index.html");
  }
  
  static async store(req, res) {
    //     
  }

  static async storeWithCliente(req, res) {
    try {
      const { cliente, simulador, usuarioId, nombre } = req.body;
      const useCase = new CrearSolicitudCompleta(
        cliente,
        simulador,
        usuarioId
      );
      await useCase.exec();

      const token = await getAccessToken(
        usuarioId,
        nombre,
        useCase.cliente.id
      );

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.ENV === "production"
        })
        .json({ 
          msg: "Cliente creado exitosamente",
          dat: {
            clienteId: useCase.cliente.id, 
            solicitudId: useCase.solicitud.id,
          }
        });
    } catch (error) {
      console.error({ error });
      if (error.name === "UniqueError" || error.name === "ValidationError") {
        return res.status(400).json(error); 
      } else {
        let responseError = new Error("Se presentó un error interno"); 
        return res.status(400).json(responseError); 
      }
    }
  }
}

module.exports = SolicitudController;
