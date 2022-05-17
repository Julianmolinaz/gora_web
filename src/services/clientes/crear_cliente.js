const ClientesRepository = require("./../../database/repositories/clientes.repository"); 
const ValidarCliente = require("./validar_cliente");

class CrearCliente {
  constructor(data, transaction = null) {
    this.data = data;
    this.transaction = transaction;
    this.cliente = null;
  }

  async exec() {
    try {
      await this.validarCliente();
      await this.salvarCliente(); 
    } catch (error) {
      throw error;
    }
  }

  async validarCliente() {
    const validarCliente = new ValidarCliente(this.data);
    await validarCliente.exec();
    if (validarCliente.fails()) {
      throw validarCliente.errors;
    }
  }

  async salvarCliente() {
    this.organizarData();
    this.cliente = await ClientesRepository.crear(
      this.data, this.transaction
    );
  }

  organizarData() {
    if (this.data.tipo_actividad === "Independiente") {
      delete this.data.tipo_contrato;
    }
    this.data["user_create_id"] = process.env.USER_ID_DEFAULT;
    this.data["created_at"] = new Date();
  }
}

module.exports = CrearCliente;
