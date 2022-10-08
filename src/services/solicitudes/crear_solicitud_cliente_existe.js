const CrearSolicitud = require("./crear_solicitud");
const { ValidarCodigoTerminos } = require("../../services/terminos");
const { VincularCliente } = require("../../services/usuarios");
const { NotificarSolicitudAnalisis } = require("../notificaciones");

const { ClientesRepository, UsuariosRepository } = require("../../database/repositories");

const mainConexion = require("../../database/conexiones/main.conexion");
const localConexion = require("../../database/conexiones/local.conexion");

const moment = require("moment");

const NUM_FACT = process.env.MY_NUM_FACT;

class CrearSolicitudClienteExiste {
  
  constructor (usuarioId, clienteId, dataSimulador, codigo) {
    this.usuarioId = usuarioId;
    this.clienteId = clienteId;
    this.dataSimulador = dataSimulador;
    this.codigo = codigo;

    this.usuario = null;
    this.cliente = null;
    this.solicitud = null;
  }

  async exec () {
    this.mainTransaction = await mainConexion.transaction();
    this.localTransaction = await localConexion.transaction();

    try {

      await this.getUsuario();

      await this.validarCodigo();

      await this.getCliente(); 

      await this.crearSolicitud();

      await this.vincularCliente();

      await this.notificarAnalisis();

      this.mainTransaction.commit();
      this.localTransaction.commit();
    } catch (err) {
      this.mainTransaction.rollback();
      this.localTransaction.rollback();
      throw err;
    }
  }

  async vincularCliente() {
    const vincular = new VincularCliente(
      this.usuarioId,
      this.cliente,
      this.localTransaction
    );
    await vincular.exec();
  }

  async getUsuario() {
    this.usuario = await UsuariosRepository.find(this.usuarioId);
  }

  async validarCodigo() {
    const useCase = new ValidarCodigoTerminos(
      this.usuario.num_doc,
      this.codigo,
      this.localTransaction
    );
    await useCase.exec();
  }

  async getCliente() {
    this.cliente = await ClientesRepository.find(
      this.clienteId
    );    
  }

  async crearSolicitud () {
    const crearSolicitud = new CrearSolicitud(
      this.dataSimulador,
      this.clienteId,
      this.mainTransaction
    );

    await crearSolicitud.exec();
    this.solicitud = crearSolicitud.solicitud;
  }

  async notificarAnalisis() {
    const notificacion = new NotificarSolicitudAnalisis(this.cliente.num_doc);
    await notificacion.execute();
  }
}

module.exports = CrearSolicitudClienteExiste;
