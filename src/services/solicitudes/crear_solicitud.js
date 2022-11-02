// Services
const {
  SolicitudesRepository,
  ConsecutivosRepository,
  VehiculosRepository,
  VentasRepository
} = require("../../database/repositories");

const { GetPrecio, GetValorCuota } = require("../simulador");
const ValidarSolicitud = require('./validar_solicitud');

// Librerias
const moment = require("moment");
const ValidadorHp = require("../../helpers/validador");
const { ValidationError, UniqueError } = require("../../errors");

// Constantes
const NUM_FACT = process.env.MY_NUM_FACT; // id consecutivos

class CrearSolicitud {
  /**
   * @params {Object} dataSimulador | información capturada en el simulador
   * @params {Integer} clienteId | cliente id
   * @params {Object} transaction | transaction de main conexión
   */
  constructor (dataSimulador, clienteId, transaction) {
    console.log("CrearSolicitud");
    this.dataSimulador = dataSimulador;
    this.clienteId = clienteId;
    this.transaction = transaction;
    this.ventas = [];
    this.vehiculos = [];
    this.now = moment().format('YYYY-DD-MM HH:mm:ss');
  }

  async exec() {
    try {

      this.validarSimulador();

      await this.castSolicitud();    

      this.validarSolicitud();

      await this.crearSolicitud();

      await this.generarVentas();

    } catch (err) {
      throw err;
    }
  }

  /***************
   * SOLICITUD
   ***************/

  validarSimulador() {
    const errSimulador = [];

    if (ValidadorHp.isEmpty(this.dataSimulador.productoId)) {
      errSimulador.push("El producto es requerido en el simulador");
    } else {
      if (process.env.PRODUCTOS_DEFAULT.indexOf == -1) {
        errSimulador.push("No existe el producto indicado en el simulador");
      }   
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.tipoVehiculoId)) {
      errSimulador.push("El tipo de vehículo es requerido")
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.modelo)) {
      errSimulador.push("El modelo del vehículo es requerido en el simulador");
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.cilindraje)) {
      errSimulador.push("El cilindraje del vehículo es requerido en el simulador")
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.periodo)) {
      errSimulador.push("El periodo es requerido en el simulador");
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.numCuotas)) {
      errSimulador.push("El número de cuotas es requerido en el simulador");
    }

    if (errSimulador.length) {
      throw new ValidationError(errSimulador);
    } 
  }

  validarSolicitud() {
    const caseValidarSolicitud = new ValidarSolicitud(this.dataSolicitud, "creacion");
    caseValidarSolicitud.exec();

    if (caseValidarSolicitud.fails()) {
      throw new ValidationError(caseValidarSolicitud.errors);
    }
  }

  async castSolicitud() {
    this.dataSolicitud = { 
      num_fact: await this.getConsecutivo(),
      fecha: moment().format("YYYY-MM-DD"),
      cartera_id: process.env.CARTERA_ID_DEFAULT,
      funcionario_id: process.env.USER_ID_DEFAULT,
      cliente_id: this.clienteId,
      producto_id: this.dataSimulador.productoId,
      punto_id: null,
      vlr_fin: await this.getVlrFin(),
      periodo: this.dataSimulador.periodo,
      meses: this.getMeses(),
      cuotas: this.getNumCuotas(),
      vlr_cuota: await this.getValorCuota(),
      p_fecha: 1, // ***
      s_fecha: 15, // ****
      estudio: "Sin estudio",
      cuota_inicial: 0,
      aprobado: "En estudio",      
      observaciones: "",
      created_at: this.now,
      updated_at: this.now, 
      user_create_id: process.env.USER_ID_DEFAULT,
      version: 4 
    };
  }

  async getConsecutivo() {
    let objConsecutivo = await ConsecutivosRepository.find(NUM_FACT);
    let incrementable = objConsecutivo.incrementable + 1; 
    await ConsecutivosRepository.update({ incrementable }, NUM_FACT, this.transaction);
    return `${objConsecutivo.prefijo}${incrementable}`;
  }

  async getVlrFin() {
    return await this.getPrecio();
  }

  async getPrecio() {
    let casePrecio = new GetPrecio({
      productoId: this.dataSimulador.productoId,
      tipoVehiculoId: this.dataSimulador.tipoVehiculoId,
      modelo: this.dataSimulador.modelo,
      cilindraje: this.dataSimulador.cilindraje,
    }); 
    this.precio = await casePrecio.execute();
    this.tarifa = casePrecio.tarifa; // Se obtienen las tarifas
    return this.precio;
  }

  async getValorCuota() {
    const caseValorCuota = new GetValorCuota(
        this.precio, 
        this.getMeses(),
        this.dataSimulador.periodo
    );
    await caseValorCuota.execute();
    return caseValorCuota.valorCuota;  
  }

  getMeses() {
    return this.dataSimulador.numCuotas;
  }

  getNumCuotas() {
    let factor = this.dataSimulador.periodo === "Quincenal" ? 2 : 1;
    return this.dataSimulador.numCuotas * factor;
  }

  async crearSolicitud() {
    this.solicitud = await SolicitudesRepository.crear(
      this.dataSolicitud,
      this.transaction
    );
  }

  /***************
   * VENTAS
   ***************/
  
  // Evalua como se crearàn las ventas
  async generarVentas() {
    const productId = this.dataSimulador.productoId;
    if (productId == 1 || productId == 2) {
      const vehiculo = await this.crearVehiculo();
      await this.crearVenta(productId, this.precio, vehiculo.id); 
    } else if (productId == 3) {
      const vehiculo1 = await this.crearVehiculo(); 
      await this.crearVenta(2, this.tarifa.valor1, vehiculo1.id);
      const vehiculo2 = await this.crearVehiculo();
      await this.crearVenta(1, this.tarifa.valor2, vehiculo2.id);
    }
  }

  castVenta(productoId, valorVenta, vehiculoId) {
    return {
      cantidad: 1,
      valor: valorVenta,
      producto_id: productoId,
      precredito_id: this.solicitud.id,
      vehiculo_id: vehiculoId,
      created_by: process.env.USER_ID_DEFAULT,
    };
  }

  async crearVenta(productoId, valorVenta, vehiculoId) {
    const dataVenta = this.castVenta(
      productoId, valorVenta, vehiculoId
    );

    const venta = await VentasRepository.crear(
      dataVenta,
      this.transaction
    );
    this.ventas.push(venta);
  }

  /****************
   * VEHICULO
   ****************/

  castVehiculo() {
    const fechaProximoAno = moment().add(1, "Y").format("YYYY-MM-DD");
    return {
      placa: this.dataSimulador.placa ?? "PENDING",
      modelo: this.dataSimulador.modelo, 
      cilindraje: this.dataSimulador.cilindraje,
      vencimiento_soat: fechaProximoAno,
      vencimiento_rtm: fechaProximoAno, 
      tipo_vehiculo_id: this.dataSimulador.tipoVehiculoId,
      created_by: process.env.USER_ID_DEFAULT,
    };
  }

  async crearVehiculo() {
    const dataVehiculo = this.castVehiculo();
    const vehiculo = await VehiculosRepository.crear(
      dataVehiculo,
      this.transaction
    );
    this.vehiculos.push(vehiculo);
    return vehiculo;
  }

}

module.exports = CrearSolicitud;
