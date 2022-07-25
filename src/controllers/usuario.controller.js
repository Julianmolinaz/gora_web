const cookieParser = require("cookie-parser");

const ValidarUsuario = require("./../services/usuarios/validar_usuario");
const RegistrarUsuario = require("./../services/usuarios/registrar_usuario");
const UsuarioExistente = require("./../services/usuarios/usuario_existente");
const GenerarCodigoUsuarioNuevo = require("./../services/usuarios/generar_codigo_usuario_nuevo");
const ValidarCodigoTerminos = require("./../services/usuarios/validar_codigo_terminos");
const Login = require("./../services/auth/login");

const UsuariosRepository = require("./../database/repositories/usuarios.repository");

class UsuarioController {
  /**
   * Para validar el movil se require verificación de la
   * data del usuario
   **/

  static async generarCodigoTerminos(req, res) {
    try {
      const data = req.body;
      const useCase = new GenerarCodigoUsuarioNuevo(data);
      await useCase.exec();

      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.json({
        success: false,
        data: error,
        msg: "Ocurrió un error",
      });
    }
  }

  static async validarCodigoTerminos(req, res) {
    try {
      const { numDoc, codigo } = req.body;
      const useCase = new ValidarCodigoTerminos(numDoc, codigo);
      const result = await useCase.exec();
      return res.json({ success: result });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        data: error,
        msg: "Ocurrió un error",
      });
    }
  }

  static async validarExistenciaDeUsuario(req, res) {
    try {
      const { numDoc } = req.body;            
      const usuarioExistente = new UsuarioExistente(numDoc);
      const result = await usuarioExistente.exec();
      return res
        .status(200)
        .json({
          success: result,
          error: false
        });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({
          success: false,
          error: true
        }); 
    }
  }

  static async store(req, res) {
    try {
      const data = req.body;
      const { num_doc, password } = data;

      const caseRegistro = new RegistrarUsuario(data);
      await caseRegistro.exec();

      const login = new Login({ num_doc: num_doc, password }); 
      const token = await login.exec();

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.ENV === "production"
        })
        .status(200)
        .json({
          message: "Usuario registrado exitosamente",
          dat: caseRegistro.usuario,
        }); 
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }
}

module.exports = UsuarioController;
