const UsuariosRepository = require("../../database/repositories/usuarios.repository");
const VentasRepository = require("../../database/repositories/ventas.repository");
const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");

class InfoObligaciones {
  constructor(usuarioId) {
    this.usuarioId = usuarioId;
    this.usuario = null;
    this.solicitudes = [];
    this.info = [];
  }
  
  async exec() {
    await this.obtenerUsuario();
    await this.obtenerSolicitudes();
    await this.castSolicitudes();
    await this.obtenerVentas();
  }

  async obtenerUsuario() {
    this.usuario = await UsuariosRepository.find(this.usuarioId);    
  }

  async obtenerSolicitudes() {
    this.solicitudes = await SolicitudesRepository.listPorCliente(
      this.usuario.cliente_id
    );
  }

  async castSolicitudes() {
    this.info = this.solicitudes.map((solicitud) => {
      let struct = this.struct();
      struct.solicitud = {
        id: solicitud.id,
        fecha: solicitud.fecha,
        vlr_fin: solicitud.vlr_fin,
        aprobado: solicitud.aprobado
      }
      return struct;
    });
  }

  /**
   *
   */
  async obtenerVentas() {
    for (let element of this.info) {
      let ventas = await VentasRepository.obtenerPorSolicitud(element.solicitud.id);
      for (let venta of ventas) {
        element.productos.push(venta.producto);
      }
    }
  }

  struct() {
    return {
      productos: [],
      solicitud: '',
      credito: '',
    }
  }
}

module.exports = InfoObligaciones;
