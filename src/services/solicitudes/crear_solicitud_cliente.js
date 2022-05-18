const CrearCliente = require("./crear_cliente");
const mainConexion = require("../../database/conexiones/main.conexion"); 

class CrearSolicitudCliente {
  constructor(dataCliente, dataSimulador) {
    this.dataCliente = dataCliente;
    this.dataSimulador = dataSimulador;
  }

  async exec() {
    this.transaction = await mainConexion.transaction(); 

    try {
      this.cliente = await this.crearCliente();
      this.solicitud = await this.crearSolicitud();
    }
  }

  async crearCliente() {
    const case = new CrearCliente(this.dadaCliente, this.transaction);
    await case.exec();
    return case.cliente();
  }

  crearSolicitud() {}

  crearVehiculo() {}
}

module.exports = CrearSolicitudCliente;
