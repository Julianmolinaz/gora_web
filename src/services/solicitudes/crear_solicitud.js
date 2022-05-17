const ValidarSolicitud = require("./validar_solicitud");
const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");

class CrearSolicitud {
  constructor(data, clienteId, transaction = null) {
    this.data = data;
    this.clienteId = clienteId;
    this.transaction = transaction;
    this.solicitud = "";
  }

  async exec() {
    this.validarSolicitud(); 
    await this.salvarSolicitud();
  }

  validarSolicitud() {
    const case = new ValidarSolicitud(
      this.data, "creacion"
    );
    case.exec();

    if (case.fails()) {
      throw case.errors;
    }
  }

  async salvarSolicitud() {
    this.solicitud = SolicitudesRepository.create(
      this.data, this.transaction
    ); 
  }
}

module.exports = CrearSolicitud;
