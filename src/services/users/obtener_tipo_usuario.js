const { SimpleError } = require("../../errors");
const {
  UsuariosRepository,
  ClientesRepository,
  SolicitudesRepository,
  CreditosRepository
} = require("../../database/repositories");

/**
 * Obtener tipo usuario: permite saber si el usuario existe, el cliente existe
 * tiene una obligación activa. 
 * @params {string} num_doc numero de documento
 * @return {Array} vector ej: [0, 0, 0] no exite usuario, ni cliente ni obligacion
 * [1, 1, 1] existe usuario, cliente y obligacion
 */

const ObtenerTipoUsuario = function (num_doc = null) {
  if (!num_doc) throw new SimpleError("se requiere el número de documento"); 
  this.usuario = null;
  this.cliente = null;
  this.solicitud = null;

  this.vector = [0, 0, 0];
  
  this.exec = async () => {
    await validarUsuario();
    const existeCliente = await validarCliente();
    if (existeCliente) {
      await validarSolicitud();
    } 
    return this.vector;
  }
  
  const validarUsuario = async () => {
    this.usuario = await getUsuario();
    if (this.usuario) this.vector[0] = 1;
  }

  const validarCliente = async () => {
    this.cliente = await getCliente();
    if (this.cliente) {
      this.vector[1] = 1;
      return true;
    } else 
      return false;
  }

  const validarSolicitud = async () => {
    this.solicitud = await getUltimaSolicitud();

    if (this.solicitud) {

      if (
        this.solicitud.aprobado === 'No' ||
        this.solicitud.aprobado === 'Desistio'
      )
        this.vector[2] = 0;

      else if (this.solicitud.aprobado === 'En estudio')
        this.vector[2] = 1;

      else if (this.solicitud.aprobado === 'Si') {
        if (
          this.solicitud.estado == null ||
          this.solicitud.estado == 'Al dia' ||
          this.solicitud.estado == 'Mora' ||
          this.solicitud.estado == 'Prejuridico' ||
          this.solicitud.estado == 'Juridico'
        )
          this.vector[2] = 1;

        else if (
          this.solicitud.estado == 'Cancelador' ||
          this.solicitud.estado == 'Cancelado por refinanciacion'
        )
          this.vector[2] = 1;
      }
    } else {
      this.vector[2] = 0;
    } 
  }

  const getUsuario = async () => {
    const result = await UsuariosRepository.findNumDoc(num_doc);
    console.log({result});
    return result;
  }

  const getCliente = async () => {
    const result = await ClientesRepository.findSome({ num_doc });
    return result;
  }

  const getUltimaSolicitud = async () => {
    const result = await SolicitudesRepository.ultimaSolicitudNumDoc(num_doc); 
    return result;
  }
}

module.exports = ObtenerTipoUsuario;

