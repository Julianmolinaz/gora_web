const {
  UsuariosRepository,
  ClientesRepository,
  SolicitudesRepository
} = require("../../database/repositories");

const VentasRepository = require("../../database/repositories/ventas.repository");
const { SimpleError } = require("../../errors");

class InfoObligaciones {
  constructor(usuarioId) {
    this.usuarioId = usuarioId;
    this.usuario = null;
    this.solicitudes = [];
    this.info = [];
    this.cliente = null;
  }
  
  async exec() {
    await this.obtenerUsuario();
    await this.obtenerCliente();
    await this.obtenerSolicitudes();
    await this.castSolicitudes();
    await this.obtenerVentas();
  }

  async obtenerUsuario() {
    this.usuario = await UsuariosRepository.find(this.usuarioId);    
  }

  async obtenerCliente() {
    this.cliente = await ClientesRepository.findSome(
      { num_doc: this.usuario.num_doc }
    );

    if (!this.cliente) {
      throw new SimpleError("No puede acceder a esta cuenta necesita calcular su cuota y solicitar tu crédito");
    }
  }

  async obtenerSolicitudes() {
    this.solicitudes = await SolicitudesRepository.listPorCliente(
      this.cliente.id
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
