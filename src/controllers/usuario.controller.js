const RegistrarUsuario = require("./../services/usuarios/registrar_usuario");

class UsuarioController {
  static async store(req, res) {
    try {
      const data = req.body;
      const caseRegistrar = new RegistrarUsuario(data);
      const result = await caseRegistrar.exec();
      return res.json({msg: "store"}); 
    } catch (error) {
      console.error(error);
      return res.json({ error });
    }
  }
}

module.exports = UsuarioController;
