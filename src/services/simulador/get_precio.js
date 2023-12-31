/**
 * calcular precio del producto
 *
 * permite calcular el precio para un tipo de vehiculo específico
 *      payload : {
 *           productoId: ...,
 *           tipovehiculoId: ...,
 *           modelo: ...,
 *           cilindraje: ...
 *      }
 *
 * tener en cuenta:
 *      en la tabla de tarifas se encuentran
 *      valor1 = precio para soat
 *      valor2 = precio para rtm
 */

const ProductosRepository = require("../../database/repositories/productos.repository");
const TarifasRepository = require("../../database/repositories/tarifas.repository");

const RTM_ID = 1;
const SOAT_ID = 2;
const KIT_ID = 3;

class GetPrecio {
  constructor(payload) {
    this.setData(payload);
    this.tarifa = {};
    this.anoPresente = new Date().getFullYear();
    this.producto = {};
  } 

  async execute() {
    await this.getProducto();
    const tarifas = await this.getTarifas();
    this.obtenerTarifaUnica(tarifas);
    const precio = this.getPrecio();
    return precio;
  }

  getPrecio() {
    let precio = 0;
    if (this.producto.id === RTM_ID) {
      precio = this.tarifa.valor2;
    } else if (this.producto.id === SOAT_ID) {
      precio = this.tarifa.valor1 + parseFloat(process.env.MY_COMMISION_1);
    } else if (this.producto.id === KIT_ID) {
      precio = 
        this.tarifa.valor1 + 
        this.tarifa.valor2 +
        parseFloat(process.env.MY_COMMISION_1);
    }
    return precio;
  }

  obtenerTarifaUnica(tarifas) {
    if (tarifas.length === 1) {
      this.tarifa = tarifas[0];
    } else {
      let x = this.cilindraje;
      let y = Math.abs(this.anoPresente - this.modelo);

      tarifas.forEach((tarifa) => {
	if (eval(tarifa.regla)) this.tarifa = tarifa;
      });
    }
  }

  async getTarifas() {
    const tarifas = await TarifasRepository.tarifasPorTipoVehiculo(this.tipoVehiculoId);  
    if (!tarifas) throw new Error("No se encontraron tarifas para este producto");
    return tarifas;
  }

  async getProducto() {
    this.producto = await ProductosRepository.findProducto(this.productoId);
    if (!this.producto) throw new Error("No existe el producto");
  }
  
  setData(payload) {
    let error = "";
    
    if (!payload.productoId) error += "El producto es requerido<br>";
    if (!payload.tipoVehiculoId) error += "El tipo de vehículo es requerido<br>";
    if (!payload.modelo) error += "El modelo del vehículo es requerido<br>";
    if (!payload.cilindraje) error += "El cilindraje del vehículo es requerido<br>";

    if (error) throw error;

    this.productoId = payload.productoId;
    this.tipoVehiculoId = payload.tipoVehiculoId;
    this.modelo = payload.modelo;
    this.cilindraje = payload.cilindraje;
  }
}

module.exports = GetPrecio;
