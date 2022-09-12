const local = require("../../database/conexiones/local.conexion"); 
const RegistroInicial = require("./registro_inicial")
const { ValidarCodigoTerminos } = require("../../services/terminos")

const RegistroConCodigo = function (dataUsuario, codigo) {
  console.log("Registro con codigo");
  this.dataUsuario = dataUsuario;
  this.codigo = codigo;
  this.usurio = null;
  
  this.exec = async () => {
    const transaction = await local.transaction();

    try {
      // Registro de usuario
      
      const registro = new RegistroInicial(
        this.dataUsuario, transaction
      );
      await registro.exec();

      this.usuario = registro.usuario;

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
}

module.exports = RegistroConCodigo;
