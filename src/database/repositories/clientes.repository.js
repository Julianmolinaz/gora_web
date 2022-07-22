const Cliente = require("./../models/cliente.model");

class ClientesRepository {
  static async getEnumValues(campo) {
    const items = await Cliente.getAttributes()[campo].values; 
    return items;
  }  

  static async find(clienteId) {
    const cliente = await Cliente.findByPk(clienteId);
    return cliente;
  }

  static async findSome(query) {
    try {
      const cliente = await Cliente.findOne({
        where: query 
      });
      return cliente;
    } catch (error) {
      throw error;
    }
  }

  static async findSome(query) {
    try {
      const cliente = await Cliente.findAll({
        where: query
      });
      return cliente;
    } catch (error) {
      throw error;
    }
  }

  static async crear(data, transaction = null) {
    delete data.id;
    try {
      const cliente = await Cliente.create(
        data,
        { transaction }
      ); 
      return cliente;
    } catch (error) {
      console.error({error});
      throw error;
    }
  }

  static async eliminar(clienteId, transaction = null) {
    try {
      await Cliente.destroy({
        where: { id: clienteId },
      });
    } catch (error) {
      throw error;
    }
  }

  static async eliminarTodo() {
    try {
      await Cliente.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ClientesRepository;
