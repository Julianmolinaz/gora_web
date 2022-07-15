const VentasRepository = require("../../database/repositories/ventas.repository");
const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");
const CreditosRepository = require("../../database/repositories/creditos.repository");

class ConsultarSolicitud {
  constructor(solicitudId) {
    this.solicitudId = solicitudId;
    this.data = {
      solicitud: null, // info solicitud
      credito: null,
      ventas: [],
    };
  }

  async exec() {
    await this.obtenerSolicitud();
    await this.obtenerCredito();
    await this.obtenerVentas();
  }

  async obtenerSolicitud() {
    let solicitudTemp = await SolicitudesRepository.find(this.solicitudId);
    this.data.solicitud = {
      id: solicitudTemp.id,
      aprobado: solicitudTemp.aprobado,
      cuotas: solicitudTemp.cuotas,
      periodo: solicitudTemp.periodo,
      fecha: solicitudTemp.fecha
    }
  }

  async obtenerCredito() {
    let credito = await CreditosRepository.findBySolicitud(
      this.data.solicitud.id
    );
    this.data.credito = credito;
  }

  async obtenerVentas() {
    let ventas = await VentasRepository.obtenerPorSolicitud(
      this.data.solicitud.id
    );
    for (let venta of ventas) {
      this.data.ventas.push(venta);
    }
  }
  
  async castProductos() {

  }

  async castVehiculo() {

  }

}

module.exports = ConsultarSolicitud;
