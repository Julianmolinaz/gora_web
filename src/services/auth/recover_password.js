const { UsuariosRepository } = require("../../database/repositories");

class RecoverPassword {
  constructor(numDoc) {
    this.numDoc = numDoc;
    this.user = null;
  }

  async exec() {
    this.user = await this.getUser(); 
    // convert password
    
    // send passwod
  }

  async etUser() {
    const user = await UsuariosRepository.findNumDoc(this.numDoc);
    return user;
  }

  convertPassword(password) {
    
  }

  sendPassword() {

  }
}

