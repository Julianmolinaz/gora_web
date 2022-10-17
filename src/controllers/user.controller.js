const cookieParser = require("cookie-parser");

const { reply } = require('../helpers/response');
const { getAccessToken } = require("../helpers/getters");

const {
  EsUsuario,
  RegistroInicial,
  ActualizarUsuario,
  RegistroConCodigo,
  RegistroConCodigoYSolicitud,
  ObtenerTipoUsuario,
} = require('./../services/users');

const { CrearSolicitudClienteExiste } = require("../services/solicitudes");
const { ValidarCodigoTerminos } = require("./../services/terminos");

class UserController {
  static async esUsuario(req, res) {
    try {
      console.log("UserController@esUsuario");
      const dataUsuario = req.body;
      const useCase = await EsUsuario.make(dataUsuario);
      reply(req, res, {
        success: true,
        body: { esUsuario: useCase },
        msg: 'ok'
      });
    } catch (err) {
      console.error(err);
      reply(req, res, {
        status: err.status || 500,
        success: false,
        body: err,
        msg: 'Ocurrió un error al validar la existencia del usuario'
      });
    }
  }

  static async register(req, res) {
    try {
      console.log("UserController@register");
      const { vector, dataUsuario, codigo, dataSimulador } = req.body;
      console.log({vector});
      const strVector = JSON.stringify(vector);

      /**
       * Usuario nuevo con o sin solicitud activa
       */

      if ( strVector === '[0,0,0]' || strVector === '[0,1,1]') {
        const registro = new RegistroConCodigo(dataUsuario, codigo);
        await registro.exec();

        res.cookie('access_token', registro.token);
        reply(req, res, {});
      }

      /**
       * Usurio nuevo, con cliente existente y sin solicitud activa 
       */

      else if (strVector === '[0,1,0]') {
        const registroConSolicitud = new RegistroConCodigoYSolicitud(
          dataUsuario, codigo, dataSimulador
        );
        await registroConSolicitud.exec();
        res.cookie('access_token', registroConSolicitud.token);
        reply(req, res, { 
          body: { 
            solicitudId: registroConSolicitud.solicitud.id
          }
        });
      }

      /**
       * Si no existe el vectore se genera excepción
       */

      else {
        throw "No existe un vector valido." 
      }
     
    } catch (err) {
      console.error(err);
      reply(req, res, {
        status: err.status,
        success: false,
        body: err,
        msg: 'Ocurrió un error al registrar el usuario'
      }); 
    }
  }

  static async getTipoUsuario(req, res) {
    try {
      console.log("UserController@getTipoUsuario");
      const { num_doc } = req.params
      const useCase = new ObtenerTipoUsuario(num_doc);
      const result = await useCase.exec();
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  }

  static async store(req, res) {
    try {
      console.log("UserController@store");
      const dataUsuario = req.body;
      const registro = new RegistroInicial(dataUsuario);
      await registro.exec();

      const token = await getAccessToken(registro.usuario.id, null, null);
      res.cookie('access_token', token);

      reply(req, res, {
        body: { usuario: registro.usuario },
        msg: 'El usuario fue creado exitosamente.'
      });
    } catch (error) {
      console.log(error);
      reply(req, res, {
        status: 404,
        success: false,
        msg: 'Ocurrio un error',
        body: error
      });
    }
  }

  static async update(req, res) {
    try {
      const { data, usuarioId_ } = req.body;
      const useCase = new ActualizarUsuario(
        data,
        usuarioId_
      );
      await useCase.exec();

      reply(req, res, {});

    } catch (error) {
      console.log(error);
      reply(req, res, {
        status: error.status || 500,
        success: false,
        msg: 'Ocurrio un error al actualizar el usuario',
        body: error
      });
    } 
  } 

  static async validateUserCode(req, res) {
    try {
      console.log("UserController@validateUserCode");
      const {
        vector, codigo, dataSimulador, dataUsuario
      } = req.body;

      const strVector = JSON.stringify(vector);
      console.log("vector: ", vector);

      /**
       * Usuario registrado sin cliente ni solicitud activa
       */

      if (strVector === "[1,0,0]") {
        const terminos = new ValidarCodigoTerminos(
          dataUsuario.num_doc, codigo
        );
        await terminos.exec();
        reply(req, res, { msg: "Ok" });
      }

      /**
       * Usuario registrado con cliente sin solicitud activa
       */

      if (strVector === "[1,1,0]") {
        const crearSolicitud = new CrearSolicitudClienteExiste(
          req.body.usuarioId_,
          req.body.clienteId_,
          dataSimulador,
          codigo
        );
        await crearSolicitud.exec();
        reply(req, res, {
          msg: "Ok",
          body: {
            solicitudId: crearSolicitud.solicitud.id
          }
        });
      }

    } catch (err) {
      console.log(err);
      reply(req, res, {
        status: err.status,
        success: false,
        body: err,
        msg: 'Ocurrió un error al validar el código'
      }); 
    } 
  }
}

module.exports = UserController;
