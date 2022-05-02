class Simulador {
  constructor(payload) {
    this.productoId = payload.ProductoId || "";
    this.tipoVehiculoId = payload.tipoVehiculoId || "";
    this.modelo = payload.modelo || "";
    this.cilindraje = payload.cilindraje || "";
    this.periodo = payload.periodo || "";
    this.numCuotas = payload.numCuotas || "";
    this.precio = payload.precio || "";
    this.valorCuota = payload.valorCuota || 0;
  }
}

