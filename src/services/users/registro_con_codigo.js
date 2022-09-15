const local = require("../../database/conexiones/local.conexion"); 
const RegistroInicial = require("./registro_inicial")
const { ValidarCodigoTerminos } = require("../../services/terminos")
const { ClientesRepository } = require("../../database/repositories");

const RegistroConCodigo = function (dataUsuario, codigo) {
  console.log("Registro con codigo");
  this.dataUsuario = dataUsuario;
  this.codigo = codigo;
  this.usurio = null;
  this.cliente = null;
  
  this.exec = async () => {
    const transaction = await local.transaction();

    try {
      // Registro de usuario
      
      const registro = new RegistroInicial(
        this.dataUsuario, transaction
      );
      await registro.exec();

      this.usuario = registro.usuario;
      
      // Obtener cliente
      this.cliente = await getCliente();

      // Validación de código

      const terminos = new ValidarCodigoTerminos(
        this.dataUsuario.num_doc, this.codigo, this.transaction
      );
      await terminos.exec();

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
}

module.exports = RegistroConCodigo;
