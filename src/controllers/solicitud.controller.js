const { Error } = require("../errors");
const { getAccessToken } = require("./../helpers/getters");
const { UsuariosRepository } = require("./../database/repositories");
const { CrearSolicitudCompleta } = require("../services/solicitudes");

class SolicitudController {
  static async create(req, res) {
    const { usuarioId_ } = req.body;
    const usuario = await UsuariosRepository.find(usuarioId_);
    return res.render("solicitud/index.html", {
      usuario: { num_doc: usuario.num_doc, movil: usuario.movil }
    });
  }
  
  static async store(req, res) {
    //     
  }

  static async storeWithCliente(req, res) {
    try {
      const { cliente, simulador, usuarioId_, nombre_ } = req.body;
      const useCase = new CrearSolicitudCompleta(
        cliente,
        simulador,
        usuarioId_
      );
      await useCase.exec();

      const token = await getAccessToken(
        usuarioId_,
        useCase.cliente.primer_nombre +' '+ useCase.cliente.primer_apellido,
        useCase.cliente.id
      );

      return res
        .cookie("access_token", token)
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
