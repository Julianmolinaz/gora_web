const RegistrarUsuario = require("./../services/usuarios/registrar_usuario");
const ValidarMovil = require("./../services/usuarios/validar_movil");

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
  static async validarMovil(req, res) {
    try {
      const { usuarioId } = req.params;
      const caseValidarMovil = new ValidarMovil(usuarioId);
      const response = await caseValidarMovil.exec();
      return res.json({ response });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }
}

module.exports = UsuarioController;
