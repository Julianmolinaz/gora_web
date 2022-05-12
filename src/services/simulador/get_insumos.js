const ProductosRepository = require("../../database/repositories/productos.repository");
const TipoVehiculosRepository = require("../../database/repositories/tipo_vehiculos.repository");
const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");

/**
 * Entrega los insumos necesarios para calcular
 * el valor de la cuota en el simulador.
 */

class GetInsumos {
  async execute() {
    let struct = this.struct();
    struct.productos = await this.getProductos();
    struct.tipoVehiculos = await this.getTipoVehiculos();
    struct.periodos = this.getPeriodos();
    struct.minCuotas = this.getMinCuotas();
    struct.maxCuotas = this.getMaxCuotas();
    return struct;
  }
  
  async getProductos() {
     return  await ProductosRepository.list();
  }

  async getTipoVehiculos() {
    return await TipoVehiculosRepository.list(); 
  }

  getPeriodos() {
    return SolicitudesRepository.getPeriodos();
  }

  getMinCuotas() {
    return 2;
  }

  getMaxCuotas() {
    return 10;
  }

  struct() {
    return {
      productos: null,
      tipoVehiculos: null,
      periodos: null,
      minCuotas: null,
      maxCuotas: null
    };
  }
}

module.exports = GetInsumos; 
