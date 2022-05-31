const ValidarSolicitud = require("./validar_solicitud");
const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");
const { ValidationError } = require("../../errors");

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
      throw new ValidationError(validarSolicitud.errors);
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
