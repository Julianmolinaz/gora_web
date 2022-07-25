const UsuariosRepository = require("../../database/repositories/usuarios.repository");

class UsuarioExistente {
  constructor(numDoc) {
    this.numDoc = numDoc;
  }

  async exec() {
    const usuario = await this.getUsuario();
    return (usuario) ? true : false;
  }
  
  async getUsuario() {
    const usuario = await UsuariosRepository.findNumDoc(this.numDoc); 
    return usuario;
  }

}


module.exports = UsuarioExistente;
