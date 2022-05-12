const Cliente = require("../models/cliente.model");

class ClientesRepository {
  static getEnumValues(campo) {
    return Cliente.rawAttributes[campo].value; 
  }  

  static async find(clienteId) {
    const cliente = await Cliente.findByPk(clienteId);
    return cliente;
  }

  static async crear(data, transaction = null) {
    const cliente = await Cliente.create(
      data, { transaction }
    ); 
    return cliente;
  }
}

module.exports = ClientesRepository;
