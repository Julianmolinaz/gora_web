const { InfoObligaciones } = require("../services/usuarios");
const { ConsultarSolicitud } = require("../services/solicitudes");
const logger = require("../libs/logger");

class CuentaController {
  static async index(req, res, next) {
    try {
      console.log("CuentaController@index");
      const { usuarioId_ } = req.body;
      const info = new InfoObligaciones(usuarioId_);
      await info.exec();
      return res.render("cuenta/index.html", {
        info: info.info
      });
    } catch (err) {
      logger.error(err.stack);
      res.clearCookie("access_token");
      return res.render("errors/403.html", { err: err.message });
    }
  }

  static async show(req, res, next) {
    try {
<<<<<<< HEAD
      console.log('CuentaController@show');
=======
>>>>>>> c833dcf56de57b0358ad9e581a3562704ffea624
      const { solicitudId } = req.params;
      const solicitud = new ConsultarSolicitud(solicitudId);
      await solicitud.exec();

      return res.render("cuenta/solicitud/show.html", {
        data: solicitud.data
      });
    } catch (err) {
      logger.error(err.stack);
      next();
    }
  }
}

module.exports = CuentaController;
