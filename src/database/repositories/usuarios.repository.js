const Usuario = require("../models/usuario.model.js");
const { encriptar } = require("./../../helpers/bcrypt"); 

class UsuariosRepository {
  static async find(usuarioId) {
    const usuario = await Usuario.findByPk(usuarioId);
    return usuario;
  }

  static async findNumDoc(numDoc) {
    try {
      const usuario = await Usuario.findOne({
        where: { num_doc: numDoc },
      });
      console.log({ usuario });
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  static async findAllSome(query) {
    try {
      const usuarios = await Usuario.findAll({
        where: query
      });
      return usuarios;
    } catch (error) {
      throw error;
    }
  }

  static async save(data, transaction = null) {
    try {
      data.password = await encriptar(data.password.trim());
      const usuario = await Usuario.create(
        data,
        { transaction }
      );
      return usuario;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  static async update(usuarioId, data, transaction = null) {
    try {
      const usuario = await Usuario.update(
        data,
        {
          where: { id: usuarioId },
          transaction
        },
      );
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  static async eliminar(usuarioId, transaction = null) {
    try {
      await Usuario.destroy({
        where: { id: usuarioId },
      });
    } catch (error) {
      throw error;
    }
  }

}

module.exports = UsuariosRepository;
