const Login = require("../auth/login");
const { ObtenerTipoUsuario } = require("../users");
const { UsuariosRepository } = require("../../database/repositories");

const LoginConTipoDeUsuario = function (data) {
  try {
    console.log("LoginConTipoDeUsuario");
    this.vector = [0, 0, 0]
    this.token = null;
    
    this.exec = async () => {
      
      const login = new Login(data);
      this.token = await login.exec();

      const tipo = new ObtenerTipoUsuario(
        login.usuario.num_doc
      );
      this.vector = await tipo.exec();
    }
  } catch (err) {
    throw err;
  }
}

module.exports = LoginConTipoDeUsuario;
