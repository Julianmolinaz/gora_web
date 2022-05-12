const RegistrarUsuario = require("./../services/usuarios/registrar_usuario");

class UsuarioController {
  static async store(req, res) {
    try {
      const data = req.body;
      const caseRegistro = new RegistrarUsuario(data);
      await caseRegistro.exec();
      return res.json({
        msg: "ok",
        dat: caseRegistro.usuario,
      }); 
    } catch (error) {
      console.error("Ocurrió un error: ", error);
      return res.json({ error });
    }
  }
}

module.exports = UsuarioController;
