const ClientesReposiroty = require("../../database/repositories/clientes.repository"); 

class CrearCliente {
  constructor(data, transaction) {
    this.data = data;
    this.transaction = transaction;
  }

  async exec() {
    try {
      this.cliente = await this.salvarCliente(); 
    } catch (error) {
      throw error;
    }
  }

  async salvarCliente() {
    const cliente = await ClientesRepository.crear(
      this.data, this.transaction
    );
    return cliente;
  }
}

module.exports = CrearCliente;
