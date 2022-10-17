const { UsuariosRepository, ClientesRepository } = require("../../database/repositories");

class VincularCliente {
  constructor(usuarioId, cliente, localTransaction = null) {
    console.log("Usuarios@VincularCliente");
    this.usuarioId = usuarioId;
    this.localTransaction = localTransaction;
    this.cliente = cliente;
    this.usuario = null;
  }

  async exec() {
    await this.updateUsuario();
  }

  async updateUsuario() {
    const data = {
      cliente_id: this.cliente.id,
      tipo_doc: this.cliente.tipo_doc,
      email: this.cliente.email,
      primer_nombre: this.cliente.primer_nombre,
      segundo_nombre: this.cliente.segundo_nombre,
      primer_apellido: this.cliente.primer_apellido,
      segundo_apellido: this.cliente.segundo_apellido
    };

    this.usuario = await UsuariosRepository.update(
      this.usuarioId,
      data,
      this.localTransaction
    );
  }
}

module.exports = VincularCliente;
