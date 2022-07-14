const UsuariosRepository = require("../../database/repositories/usuarios.repository");

class VincularCliente {
  constructor(usuarioId, clienteId) {
    this.clienteId = clienteId; 
    this.usuarioId = usuarioId;
  }

  async exec() {
    return await UsuariosRepository.update(
      this.usuarioId,
      { cliente_id: this.clienteId }
    ); 
  }
}

module.exports = VincularCliente;
