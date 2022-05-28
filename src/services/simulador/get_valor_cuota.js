const FactoresRepository = require("../../database/repositories/factores.repository");

/**
 * Obtener valor de la cuota
 * Permite generar el valor de la cuota partiendo de
 * un precio, numero de cuotas mensuales y periodo
 * Quincenal = 2
 * Mensual = 1
 */

class GetValorCuota {
  constructor(precioProducto, numCuotasMensuales, periodo) {
    console.log(precioProducto, numCuotasMensuales, periodo);
    this.precioProducto = precioProducto;
    this.numCuotasMensuales = numCuotasMensuales;
    this.periodo = (periodo === "Quincenal") ? 2 : 1; 
    this.factor = {};
    this.valorCuota = 0;
  }

  async execute() {
    await this.getFactor();
    this.calcularValorCuota();
  }

  calcularValorCuota() {
    this.valorCuota = Math.round(
      (this.precioProducto * this.factor.valor) /
      this.periodo /
      this.numCuotasMensuales
    );
  }

  async getFactor() {
    this.factor = await FactoresRepository.getFactorPorNumeroCuotas(
      this.numCuotasMensuales
    );
  }
}

module.exports = GetValorCuota;
