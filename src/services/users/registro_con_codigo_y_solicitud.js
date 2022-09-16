const local = require("../../database/conexiones/local.conexion"); 
const main = require("../../database/conexiones/main.conexion"); 
const { ClientesRepository } = require("../../database/repositories");

const RegistroInicial = require("./registro_inicial")
const { CrearSolicitud } = require("../solicitudes");
const { ValidarCodigoTerminos } = require("../../services/terminos")
const { CrearSolicitudCompleta } = require("../../services/solicitudes")

const { getAccessToken } = require("../../helpers/getters");


const RegistroConCodigoYSolicitud = function (
  dataUsuario, codigo, dataSimulador
) {
  this.data
  this.usuario = null;
  this.cliente = null;
  this.solicitud = null;
  this.token = null;
  
  this.exec = async () => {
    const mainTransaction = await main.transaction();
    const localTransaction = await local.transaction();

    try {

      /*****************************
       * Validación codigo términos
       *****************************/
      const terminos = new ValidarCodigoTerminos(
        dataUsuario.num_doc, codigo, localTransaction
      );
      await terminos.exec();

      /*****************************
       * Registro de usuario
       *****************************/
      const registro = new RegistroInicial(
        dataUsuario, localTransaction
      );
      await registro.exec();

      /*****************************
       * Obtener usuario
       *****************************/
      this.usuario = registro.usuario;

      /*****************************
       * Obtener cliente
       *****************************/
      this.cliente = await getCliente();

      /*****************************
       * Crear solicitud 
       *****************************/
      const crearSolicitud = new CrearSolicitud(
        dataSimulador,
        this.cliente.id,
        mainTransaction
      );
      await crearSolicitud.exec();

      this.solicitud = crearSolicitud.solicitud;

      /*****************************
       * Generar Token 
       *****************************/
      await getToken();

      await mainTransaction.commit();
      await localTransaction.commit();
    } catch (err) {
      await mainTransaction.rollback();
      await localTransaction.rollback();
      throw err;
    }
  }

  const getCliente = async () => {
    return await ClientesRepository.findSome(
      { num_doc: this.usuario.num_doc }
    );    
  }

  const getToken = async () => {
    this.token = await getAccessToken(
      this.usuario.id,
      `${this.cliente.primer_nombre} ${this.cliente.primer_apellido}` ,
      this.cliente.id,
      { codigo }
    );
  }

}

module.exports = RegistroConCodigoYSolicitud;
