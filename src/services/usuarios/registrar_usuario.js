const ValidarUsuario = require("./validar_usuario");
const UsuariosRepository = require("../../database/repositories/usuarios.repository");
const conexion = require("../../database/conexiones/local");

class RegistrarUsuario {
  constructor(data) {
    this.data = data;
    this.codigo = "";
  }

  async exec() {
    try {
      conexion.query("START TRANSACTION");
      await this.validarDatos();
      await this.registrar();
      await this.generarCodigo();
      conexion.query("COMMIT");
      conexion.release();
    } catch (error) {
      conexion.query("ROLLBACK");
      conexion.release();
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

  async registrar() {
    const usuario = UsuariosRepository.save(this.data); 
  }
}

module.exports = RegistrarUsuario;
