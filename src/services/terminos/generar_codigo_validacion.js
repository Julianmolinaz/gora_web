const UsuariosRepository = require("../../database/repositories/usuarios.repository");
const { generarCodigo } = require("../../helpers/getters");
const { sendSms } = require("../notificaciones/simple_textual_message"); 

class GenerarCodigoValidacion {
  constructor(usuarioId) {
    this.usuarioId = usuarioId; 
    this.usuario = "";
    this.codigo = "";
  }

  async exec() {
    try {
      this.generarCodigo();
      await this.guardarCodigo();
      const response = await this.enviarCodigo();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async generarCodigo() {
    this.codigo = generarCodigo(4); 
  }

  async guardarCodigo() {
    this.usuario = await UsuariosRepository.update(
      this.usuarioId,
      { codigo: this.codigo }
    ); 
  }

  async enviarCodigo() {
    const response = await sendSms(
      "INVERSIONES GORA SAS",
      process.env.COUNTRY_CODE + this.usuario.movil,
      `GORA: para aceptar terminos y condiciones escriba el siguiente codigo: ${this.codigo}`
    );
    return response;
  }
}

module.exports = GenerarCodigoValidacion;
