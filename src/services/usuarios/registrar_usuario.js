const ValidarUsuario = require("./validar_usuario");
const UsuariosRepository = require("../../database/repositories/usuarios.repository");
const ClientesRepository = require("../../database/repositories/clientes.repository");
const CodigoRepository = require("../../database/repositories/codigos.repository");
const local = require("../../database/conexiones/local.conexion");

class RegistrarUsuario {
  constructor(data) {
    this.data = data;
    this.usuario = null;
  }

  async exec() {
    const transaction = await local.transaction();
    try {
      await this.validarDatos();
      const usuario = await this.registrar(transaction);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async validarDatos() {
    const validacion = new ValidarUsuario(this.data);
    await validacion.exec();
    if (validacion.fails()) {
      throw validacion.errors;
    }
  }

  async registrar(transaction) {
    this.usuario = await UsuariosRepository.save(dataUsuario, transaction); 
  }
  
}

module.exports = RegistrarUsuario;
