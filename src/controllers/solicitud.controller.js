const { Error } = require("../errors");
const { getAccessToken } = require("./../helpers/getters");
const { UsuariosRepository } = require("./../database/repositories");
const { CrearSolicitudCompleta } = require("../services/solicitudes");
const { Prevalidacion } = require("../services/solicitudes");
const logger = require("../libs/logger");

class SolicitudController {
  static async create(req, res) {
    try {
      const { usuarioId_ } = req.body;
      
      const usuario = await UsuariosRepository.find(usuarioId_);

      const prevalidacion = new Prevalidacion(usuario.num_doc);
      const result = await prevalidacion.exec();

      if (result) {
        return res.render("solicitud/index.html", {
          usuario: { num_doc: usuario.num_doc, movil: usuario.movil }
        });
      } else {
        return res.render('errors/403.html'); 
      }
    } catch(err) {
      logger.error(err.stack);
      return res.render('errors/403.html'); 
    }
  }
  
  static async store(req, res) {
    //     
  }

  static async storeWithCliente(req, res) {
    try {
      console.log("SolicitudController@storeWithCliente");
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
      logger.error(error.stack);
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
