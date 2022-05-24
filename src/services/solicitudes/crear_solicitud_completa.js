const mainConexion = require("../../database/conexiones/main.conexion"); 
const ConsecutivosRepository = require("../../database/repositories/consecutivos.repository");

const validator = require("validator");
const ValidadorHp = require("../../helpers/validador");

const CrearSolicitud = require("./crear_solicitud");
const ValidarSolicitud = require("./validar_solicitud");
const CrearCliente = require("../clientes/crear_cliente");
const ValidarCliente = require("../clientes/validar_cliente");
const GetPrecio = require("../simulador/get_precio"); 
const GetValorCuota = require("../simulador/get_valor_cuota");

const ClientesRepository = require("../../database/repositories/clientes.repository");
const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");

const NUM_FACT = 6;

class CrearSolicitudCompleta {
  constructor(dataCliente, dataSimulador) {
    this.dataCliente = dataCliente;
    this.dataSimulador = dataSimulador;
    this.dataSolicitud = "";

    this.cliente = "";
    this.solicitud = "";

    this.precio = 0;
    this.errors = [];
  }

  async exec() {
    try {
      //this.transaction = await mainConexion.transaction(); 
      this.validarSimulador();
      await this.validarCliente();
      await this.crearCliente();

      await this.castSolicitud();
      this.validarSolicitud();
      await this.crearSolicitud();

      console.log(this.errors);

    } catch (error) {
      throw error;
    }
  }

  validarSimulador() {
    if (ValidadorHp.isEmpty(this.dataSimulador.productoId)) {
      this.errors.push(["El producto es requerido en el simulador"]);
    } else {
      if (process.env.PRODUCTOS_DEFAULT.indexOf == -1) {
        this.errors.push(["No existe el producto indicado en el simulador"]);
      }   
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.tipoVehiculoId)) {
      this.errors.push(["El tipo de vehículo es requerido"])
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.modelo)) {
      this.errors.push(["El modelo del vehículo es requerido en el simulador"]);
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.cilindraje)) {
      this.errors.push(["El cilindraje del vehículo es requerido en el simulador"])
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.periodo)) {
      this.errors.push(["El periodo es requerido en el simulador"]);
    }
    if (ValidadorHp.isEmpty(this.dataSimulador.numCuotas)) {
      this.errors.push(["El número de cuotas es requerido en el simulador"]);
    }
  }

  async validarCliente() {
    const caseValidarCliente = new ValidarCliente(this.dataCliente); 
    await caseValidarCliente.exec();

    if (caseValidarCliente.fails()) {
      this.errors = this.errors.concat(caseValidarCliente.errors);
    }
  }

  validarSolicitud() {
    const caseValidarSolicitud = new ValidarSolicitud(
      this.dataSolicitud,
      "creacion"
    );
    caseValidarSolicitud.exec();

    if (caseValidarSolicitud.fails()) {
      this.errors = this.errors.concat(caseValidarSolicitud.errors);
    }
  }

  castCliente() {}

  async castSolicitud() {
    this.dataSolicitud = {    
      num_fact: await this.getConsecutivo(),
      fecha: new Date(),
      cartera_id: process.env.CARTERA_ID_DEFAULT,
      funcionario_id: process.env.USER_ID_DEFAULT,
      cliente_id: this.cliente.id,
      producto_id: this.dataSimulador.productoId,
      punto_id: null,
      vlr_fin: await this.getVlrFin(),
      periodo: this.dataSimulador.periodo,
      meses: this.getMeses(),
      cuotas: this.dataSimulador.numCuotas,
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
    await ConsecutivosRepository.update({ incrementable }, NUM_FACT);
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
    const factorPeriodo = (this.dataSimulador.periodo == 'Quincenal') ? 2 : a;
    return this.dataSimulador.numCuotas / factorPeriodo;
  }
  
  castVenta() {}

  castVehiculo() {}

  async crearCliente() {
    this.cliente = await ClientesRepository.crear(this.dataCliente);
  }

  async crearSolicitud() {
    this.solicitud = await SolicitudesRepository.crear(this.dataSolicitud);
  }

  async crearVenta() {

  }

  crearVehiculo() {}
}

module.exports = CrearSolicitudCompleta;
