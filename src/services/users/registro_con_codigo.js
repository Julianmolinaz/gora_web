const { ValidarCodigoTerminos } = require("../../services/terminos")
const { ClientesRepository } = require("../../database/repositories");
const { getAccessToken } = require("../../helpers/getters");
const RegistroInicial = require("./registro_inicial")
const local = require("../../database/conexiones/local.conexion"); 

const RegistroConCodigo = function (dataUsuario, codigo) {
  this.dataUsuario = dataUsuario;
  this.codigo = codigo;
  this.usurio = null;
  this.cliente = null;
  this.token = null;
  
  this.exec = async () => {
    const transaction = await local.transaction();
    try {

      /*****************************
       * Validación codigo términos
       *****************************/
      const terminos = new ValidarCodigoTerminos(
        this.dataUsuario.num_doc,
        this.codigo,
        this.transaction
      );
      await terminos.exec();

      /*****************************
       * Registro de usuario
       *****************************/
      const registro = new RegistroInicial(
        this.dataUsuario, transaction
      );
      await registro.exec();

      this.usuario = registro.usuario;
      this.cliente = await getCliente();

      /*****************************
       * Generar Token 
       *****************************/
      await getToken();

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
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
      this.cliente ? `${this.cliente.primer_nombre} ${this.cliente.primer_apellido}` : '',
      this.cliente ? this.cliente.id : null,
      { codigo }
    );
  }
}

module.exports = RegistroConCodigo;
