const { Login } = require("../services/auth");
const { LoginConTipoDeUsuario } = require("../services/auth");
const { reply } = require('../helpers/response');
const logger = require("../libs/logger");

const cookieParser = require("cookie-parser");

class AuthController {
  static index(req, res) {
    return res.render("auth/login/index.html")
  }

  static async login(req, res) {
    try {
      const data = req.body;
      const login = new Login(data);
      const token = await login.exec();
      
      res.cookie("access_token", token);
      reply(req, res, {
        msg: "Ingreso exitoso"
      });
    } catch (err) {
      logger.error(err.stack);
      reply(req, res, {
        status: err.status,
        success: false,
        body: err,
        msg: "Credenciales invalidas, verifique su documento y contraseña"
      });
    }
  }

  static async loginSolicitud(req, res) {
    try {
      const data = req.body;
      const login = new LoginConTipoDeUsuario(data); 
      await login.exec();

      res.cookie("access_token", login.token);

      reply(req, res, {
        body: {
          vector: login.vector
        }
      });
    } catch (err) {
      logger.error(err.stack);
      reply(req, res, {
        status: err.status,
        success: false,
        body: err,
        msg: "Validación de usuario incorrecta"
      });
    } 
  }

  static async logout(req, res) {
    return res
      .clearCookie("access_token")
      .status(200)
      .redirect("/");
  }
}

module.exports = AuthController;
