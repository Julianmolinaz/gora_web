/**
 * Crear solicitud completa
 * Permite crear una solicitud con su cliente, ventas y vehiculos
 * Ademas permite vincular el usuario con el cliente
 **/

// Persistencia 
const mainConexion = require("../../database/conexiones/main.conexion");
const ClientesRepository = require("../../database/repositories/clientes.repository");
const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");
const ConsecutivosRepository = require("../../database/repositories/consecutivos.repository");
const VehiculosRepository = require("../../database/repositories/vehiculos.repository");
const VentasRepository = require("../../database/repositories/ventas.repository");

// Librerias
const moment = require("moment");
const validator = require("validator");
const ValidadorHp = require("../../helpers/validador");
const { ValidationError, UniqueError } = require("../../errors");

// Servicios
const ValidarSolicitud = require("./validar_solicitud");
const VincularCliente = require("../usuarios/vincular_cliente");
const ValidarCliente = require("../clientes/validar_cliente");
const GetPrecio = require("../simulador/get_precio"); 
const GetValorCuota = require("../simulador/get_valor_cuota");

// Constantes
const NUM_FACT = 6; // id consecutivos

//----------------------------

class CrearSolicitudCompleta {
  constructor(dataCliente, dataSimulador, usuarioId) {
    // Información inicial 
    this.dataCliente = dataCliente;
    this.dataSimulador = dataSimulador;
    this.dataSolicitud = "";
    this.dataVehiculo = null;
    this.usuarioId = usuarioId;

    // Entidades
    this.cliente = "";
    this.solicitud = "";
    this.vehiculos = [];
    this.ventas = [];
    this.tarifa = null;

    // otros
    this.transaction = null;
    this.precio = 0;
    this.errors = [];
  }

  async exec() {
    this.transaction = await mainConexion.transaction(); 
    
    try {
      this.validarSimulador();

      this.validarCliente();
      await this.validarClienteUnico(); 
      await this.crearCliente(); // desde repository

      await this.vincularClienteConUsuario();

      await this.castSolicitud();
      this.validarSolicitud();
      await this.crearSolicitud();

      await this.generarVentas();

      this.transaction.commit();
    } catch (error) {
      this.transaction.rollback();
      throw error;
    }
  }

  /*****************
   * SIMULADOR
   *****************/

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

  /***********************
   * CLIENTE
   ***********************/

  async validarCliente() {
    const caseValidarCliente = new ValidarCliente(this.dataCliente); 
    await caseValidarCliente.exec();

    if (caseValidarCliente.fails()) {
      throw new ValidationError(caseValidarCliente.errors);
    }
  }

  async validarClienteUnico() {
    const cliente = await ClientesRepository.findSome({
      num_doc: this.dataCliente.num_doc
    });
	  
    if (cliente) {
      throw new UniqueError("Ya existe un cliente registrado");
    } 
  }

  async crearCliente() {
    this.cliente = await ClientesRepository.crear(
      this.dataCliente,
      this.transaction
    );
  }

  async vincularClienteConUsuario() {
    const vincular = new VincularCliente(
      this.usuarioId,
      this.cliente.id,
      this.transaction
    );
    const usuario = await vincular.exec();
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

  async castSolicitud() {
    this.dataSolicitud = {};
    this.dataSolicitud = { 
      num_fact: await this.getConsecutivo(),
      fecha: moment().format("YYYY-MM-DD"),
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
      placa: this.dataCliente.placa,
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

module.exports = CrearSolicitudCompleta;
