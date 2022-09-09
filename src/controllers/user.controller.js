const { RegistroInicial } = require('./../services/users');
const { reply } = require('../helpers/response');

class UserController {
  static async store(req, res) {
    try {
      const dataUser = req.body;
      const registro = new RegistroInicial(dataUser);
      const user = await registro.exec();
      reply(req, res, {
        body: { user },
        msg: 'El usuario fue creado exitosamente.'
      });
    } catch (error) {
      reply(req, res, {
        status: 404,
        success: false,
        msg: 'Ocurrio un error',
        body: error
      });
    }
  }
}

module.exports = UserController;
