const UsuariosRepository = require("../../database/repositories/usuarios.repository");

class ValidarCodigo {
  constructor(usuarioId, codigo) {
    this.usuarioId = usuarioId;
    this.codigo = codigo;
  }

  async exec() {
    await this.getUsuario();
    return this.compararCodigos();
  }

  compararCodigos() {
    return (this.codigo == this.usuario.codigo);
  }

  async getUsuario() {
    this.usuario = await UsuariosRepository.find(this.usuarioId);
  }
}

module.exports = ValidarCodigo;
