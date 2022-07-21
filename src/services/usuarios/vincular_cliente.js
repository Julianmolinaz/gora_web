const UsuariosRepository = require("../../database/repositories/usuarios.repository");

class VincularCliente {
  constructor(usuarioId, clienteId, transaction) {
    this.clienteId = clienteId; 
    this.usuarioId = usuarioId;
    this.transaction = transaction;
  }

  async exec() {
    return await UsuariosRepository.update(
      this.usuarioId,
      { cliente_id: this.clienteId },
      this.transaction
    ); 
  }
}

module.exports = VincularCliente;
