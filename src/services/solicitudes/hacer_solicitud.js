/**
 * HacerSolicitud
 * Caso de uso que permite realizar todo el proceso 
 * desde crear un cliente, sus referencias, generar venta y 
 * crear la solicitud
 *
 */

class HacerSolicitud {
  constructor(payload) {
    this.cliente = payload.cliente;
    this.solicitud = payload.solicitud;
    this.venta = payload.venta;
    this.referencias = payload.referencias;
    this.documentos = payload.documentos;
  }
}
