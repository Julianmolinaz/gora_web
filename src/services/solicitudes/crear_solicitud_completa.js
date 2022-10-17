/**
 * Crear solicitud completa
 * Permite crear una solicitud con su cliente, ventas y vehiculos
 * Ademas permite vincular el usuario con el cliente
 **/

// Services
const { CrearCliente } = require("../clientes");
const CrearSolicitud = require("./crear_solicitud");
const { VincularCliente } = require("../usuarios");
const { NotificarSolicitudAnalisis } = require("../notificaciones");

// Persistencia 
const mainConexion = require("../../database/conexiones/main.conexion");
const localConexion = require("../../database/conexiones/local.conexion");
const { UsuariosRepository } = require("../../database/repositories");

const { ValidationError, UniqueError } = require("../../errors");

class CrearSolicitudCompleta {
  constructor(dataCliente, dataSimulador, usuarioId) {
    console.log("Solicitudes@CrearSolicitudCompleta");
    // Información inicial 
    this.dataCliente = dataCliente;
    this.dataSimulador = dataSimulador;
    this.usuarioId = usuarioId;

    // Entidades
    this.usuario = "";
    this.cliente = "";
    this.solicitud = "";

    // otros
    this.transaction = null;
    this.localTransaction = null;
  }

  async exec() {
    this.transaction = await mainConexion.transaction(); 
    this.localTransaction = await localConexion.transaction();
    
    try {
      await this.getUsuario();

      await this.crearCliente();

      await this.crearSolicitud();

      await this.vincularClienteConUsuario();

      await this.notificarAnalisis();

      this.transaction.commit();
      this.localTransaction.commit();

    } catch (error) {

      this.transaction.rollback();
      this.localTransaction.rollback();

      throw error;
    }
  }

  async getUsuario() {
    this.usuario = await UsuariosRepository.find(this.usuarioId); 
  }

  async crearCliente() {
    const useCase = new CrearCliente(this.dataCliente, this.transaction); 
    await useCase.exec();
    this.cliente = useCase.cliente;
  }

  async vincularClienteConUsuario() {
    const vincular = new VincularCliente(
      this.usuario.id,
      this.cliente,
      this.localTransaction
    );
    await vincular.exec();
  }

  async crearSolicitud() {
    const useCase = new CrearSolicitud(
      { ...this.dataSimulador, placa: this.dataCliente.placa },
      this.cliente.id,
      this.transaction
    );
    await useCase.exec();
    this.solicitud = useCase.solicitud;
  }

  async notificarAnalisis() {
    const notificacion = new NotificarSolicitudAnalisis(this.cliente.num_doc);
    await notificacion.execute();
  }

}

module.exports = CrearSolicitudCompleta;
