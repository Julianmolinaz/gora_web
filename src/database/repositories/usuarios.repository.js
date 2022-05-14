const Usuario = require("../models/usuario.model.js");
const { encriptar } = require("./../../helpers/bcrypt"); 

class UsuariosRepository {
  static async findNumDoc(numDoc) {
    try {
      const usuario = Usuario.findOne({
        where: { num_doc: numDoc },
      });
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  static async save(data, transaction = null) {
    try {
      data.password = await encriptar(data.password.trim());
      const usuario = await Usuario.create(data, { transaction });
      return usuario;
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }

  static async update(usuarioId, data, transaction = null) {
    try {
      const usuario = await Usuario.findByPk(usuarioId);
      usuario.set(data);
      await usuario.save();
      return usuario;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = UsuariosRepository;
