const RegistrarUsuario = require("../services/usuarios/registrar_usuario");
const ValidarMovil = require("../services/usuarios/validar_movil"); 

class TerminosController {

  /**
   * Al aceptar términos y condiciones
   * 1- Se valida si el usuario existe
   * 2- Si no existe se crea el nuevo usuario
   * 3- Se envía el mensaje de texto
   **/

  static async registrarAceptarTerminos(req, res) {
    try {
      const data = req.body;
      const registrar = new RegistrarUsuario(data);
      registrar.exec();
      return res.json({ msg: "aceptar términos y condiciones" });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

module.exports = TerminosController;
