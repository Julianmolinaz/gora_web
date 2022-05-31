const RegistrarUsuario = require("./../services/usuarios/registrar_usuario");

class UsuarioController {
  static async store(req, res) {
    try {
      const data = req.body;
      const caseRegistro = new RegistrarUsuario(data);
      await caseRegistro.exec();
      return res.json({
        message: "Usuario registrado exitosamente",
        dat: caseRegistro.usuario,
      }); 
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

}

module.exports = UsuarioController;
