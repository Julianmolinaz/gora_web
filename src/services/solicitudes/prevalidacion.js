const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");

class Prevalidacion {
  constructor(clienteId) {
    this.clienteId = clienteId;
    this.errors = [];
  }

  async exec() {
    try {
      await this.existenSolicitudesActivas();
      await this.existenCreditosActivos();
    } catch (error) {
      throw error;
    }   
  }


  async existenSolicitudesActivas() {
    const solicitud = SolicitudesRepository.findBySome({
      cliente_id: this.clienteId,
    });

    if (solicitud) {
      this.errors.push(["Existe una solicitud activa para este cliente"]); 
    }
  }

  async existenCreditosActivos() {

  }


}
