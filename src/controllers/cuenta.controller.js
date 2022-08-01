const InfoObligaciones = require("../services/usuarios/info_obligaciones");
const ConsultarSolicitud = require("../services/solicitudes/consultar_solicitud");

class CuentaController {
  static async index(req, res) {
    const { usuarioId } = req.body;
    const info = new InfoObligaciones(usuarioId);
    await info.exec();
    return res.render("cuenta/index.html", {
      info: info.info
    });
  }

  static async show(req, res) {
    const { solicitudId } = req.params;
    const solicitud = new ConsultarSolicitud(solicitudId);
    await solicitud.exec();

    console.log(solicitud.data);

    return res.render("cuenta/solicitud/show.html", {
      data: solicitud.data
    });
  }
}

module.exports = CuentaController;
