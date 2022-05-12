const conexion = require("../conexiones/local");
const { capitalizar } = require("./../../helpers/getters"); 
const { encriptar } = require("./../../helpers/setters"); 
const Usuario = require("../models/usuario.model.js");

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

}

module.exports = UsuariosRepository;