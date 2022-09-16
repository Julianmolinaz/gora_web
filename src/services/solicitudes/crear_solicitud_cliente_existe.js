const { ConsecutivosRepository } = require("../../database/repositories");

// Librerias
const moment = require("moment");

// Servicios
const { GetPrecio, GetValorCuota } = require("../simulador"); 
const { ValidarSolicitud } = require("./");

// Constantes
const NUM_FACT = 6; // id consecutivos

class CrearSolicitudClienteExiste {
  
  constructor (clienteId, dataSimulador, transaction = null) {
    this.dataSolicitud = null;
    this.clienteId = clienteId;
    this.solicitud = null;
    this.ventas = [];
    this.tarifa = null;
    this.precio = 0;
  }

  async exec () {
    this.validarSimulador();

    await this.castSolicitud();
    this.validarSolicitud();
  }


  /***************
   * SOLICITUD
   ***************/

  validarSolicitud() {
    const caseValidarSolicitud = new ValidarSolicitud(this.dataSolicitud, "creacion");
    caseValidarSolicitud.exec();

    if (caseValidarSolicitud.fails()) {
      throw new ValidationError(caseValidarSolicitud.errors);
    }
  }

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

}


