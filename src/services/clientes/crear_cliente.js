const ClientesRepository = require("./../../database/repositories/clientes.repository"); 
const ValidarCliente = require("./validar_cliente");
const { ValidationError, UniqueError } = require("./../../errors");

class CrearCliente {
  constructor(data, transaction = null) {
    this.data = data;
    this.transaction = transaction;
    this.cliente = null;
  }

  async exec() {
    try {
      this.validarCliente();
      await this.validarClienteUnico();
      await this.salvarCliente(); 
      // asignarlo a usuario
    } catch (error) {
      throw error;
    }
  }

  validarCliente() {
    const validarCliente = new ValidarCliente(this.data);
    validarCliente.exec();
    if (validarCliente.fails()) {
      throw new ValidationError(validarCliente.errors);
    }
  }

  async validarClienteUnico() {
    const cliente = await ClientesRepository.findSome({
      num_doc: this.data.num_doc
    });

    if (cliente.length) {
      throw new UniqueError("Ya existe un cliente registrado");
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
