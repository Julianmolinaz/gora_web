const { 
  GenerarCodigoUsuarioNuevo,
  GenerarCodigoUsuarioExistente
} = require("../services/terminos"); 
const { reply } = require('../helpers/response');

class TerminosController {
  static async generarCodigoUsuarioNuevo(req, res) {
    try {
      console.log("TerminosController@generarCodigoUsuarioNuevo");
      const dataUsuario = req.body;
      const useCase = new GenerarCodigoUsuarioNuevo(dataUsuario);
      await useCase.exec();
      reply(req, res, {
        msg: 'Se generó el codigo exitosamente'
      });
    } catch (err) {
      console.error(err);
      reply(req, res, {
        success: false,
        status: err.status,
        body: err,
        msg: 'Ocurrió un error al generar el código de terminos y condiciones'
      });
    }
  }

  static async generarCodigoUsuarioExistente(req, res) {
    try {
      console.log("TerminosController@generarCodigoUsuarioExistente");
      const { usuarioId_ } = req.body;
      const useCase = new GenerarCodigoUsuarioExistente(usuarioId_);
      await useCase.exec();
      reply(req, res, {
        msg: 'Se generó el codigo exitosamente'
      });
    } catch (err) {
      console.error(err);
      reply(req, res, {
        success: false,
        status: err.status,
        body: err,
        msg: 'Ocurrió un error al generar el código de terminos y condiciones'
      });
    }
  }

}

module.exports = TerminosController;
