const ValidarSolicitud = require("./validar_solicitud");
const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");

class CrearSolicitud {
  constructor(data, transaction = null) {
    this.data = data;
    this.transaction = transaction;
    this.solicitud = "";
  }

  async exec() {
    this.validarSolicitud(); 
    await this.salvarSolicitud();
  }

  validarSolicitud() {
    const validarSolicitud = new ValidarSolicitud(
      this.data,
      "creacion"
    );
    validarSolicitud.exec();

    if (validarSolicitud.fails()) {
      throw validarSolicitud.errors;
    }
  }

  async salvarSolicitud() {
    this.solicitud = await SolicitudesRepository.crear(
      this.data,
      this.transaction
    ); 
  }
}

module.exports = CrearSolicitud;
