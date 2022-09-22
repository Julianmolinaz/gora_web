/**
 * Crear solicitud completa
 * Permite crear una solicitud con su cliente, ventas y vehiculos
 * Ademas permite vincular el usuario con el cliente
 **/

// Services
const { CrearCliente } = require("../clientes");
const CrearSolicitud = require("./crear_solicitud");

// Persistencia 
const mainConexion = require("../../database/conexiones/main.conexion");
const localConexion = require("../../database/conexiones/local.conexion");
const { UsuariosRepository } = require("../../database/repositories");

const { ValidationError, UniqueError } = require("../../errors");

class CrearSolicitudCompleta {
  constructor(dataCliente, dataSimulador, usuarioId) {
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

      await this.vincularClienteConUsuario();

      await this.crearSolicitud();

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
    const data = {
      cliente_id: this.cliente.id,
      tipo_doc: this.cliente.tipo_doc,
      email: this.cliente.email,
      primer_nombre: this.cliente.primer_nombre,
      segundo_nombre: this.cliente.segundo_nombre,
      primer_apellido: this.cliente.primer_apellido,
      segundo_apellido: this.cliente.segundo_apellido
    };

    this.usuario = await UsuariosRepository.update(
      this.usuario.id,
      data,
      this.localTransaction
    );
  }

  async crearSolicitud() {
    const useCase = new CrearSolicitud(
      this.dataSimulador,
      this.cliente.id,
      this.transaction
    );
    await useCase.exec();
    this.solicitud = useCase.solicitud;
  }

}

module.exports = CrearSolicitudCompleta;
