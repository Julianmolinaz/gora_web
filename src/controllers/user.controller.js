const cookieParser = require("cookie-parser");

const { reply } = require('../helpers/response');
const { getAccessToken } = require("../helpers/getters");

const {
  RegistroInicial,
  ActualizarUsuario
} = require('./../services/users');

class UserController {
  static async store(req, res) {
    try {
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
      console.log(req.body);
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
}

module.exports = UserController;
