const cookieParser = require("cookie-parser");

const ValidarUsuario = require("./../services/usuarios/validar_usuario");
const RegistrarUsuario = require("./../services/usuarios/registrar_usuario");
const UsuarioExistente = require("./../services/usuarios/usuario_existente");
const GenerarCodigoUsuarioNuevo = require("./../services/usuarios/generar_codigo_usuario_nuevo");
const ValidarCodigoTerminos = require("./../services/usuarios/validar_codigo_terminos");
const Login = require("./../services/auth/login");

const UsuariosRepository = require("./../database/repositories/usuarios.repository");
const ClientesRepository = require("./../database/repositories/clientes.repository");

const CrearUsuarioFlujoInicial = require("./../services/usuarios/crear_usuario_flujo_inicial");

class UsuarioController {
  /**
   * Para validar el movil se require verificación de la
   * data del usuario
   **/

  static async generarCodigoTerminos(req, res) {
    console.log("UsuarioController@generarCodigoTerminos");
    try {
      const data = req.body;
      const useCase = new GenerarCodigoUsuarioNuevo(data);
      await useCase.exec();

      return res.json({ success: true });
    } catch (error) {
      console.log("ERROR UsuarioController@generarCodigoTerminos");
      console.error(error);
      return res.json({
        success: false,
        data: error,
        msg: "Ocurrió un error",
      });
    }
  }

  static async validarCodigoTerminos(req, res) {
    console.log("UsuarioController@validarCodigoTerminos");
    try {
      const { numDoc, codigo } = req.body;
      const useCase = new ValidarCodigoTerminos(numDoc, codigo);
      const result = await useCase.exec();
      return res.json({ success: result });
    } catch (error) {
      console.log("ERROR UsuarioController@validarCodigoTerminos");
      console.error(error);
      return res.json({
        success: false,
        data: error,
        msg: "Ocurrió un error",
      });
    }
  }

  static async validarExistenciaDeUsuario(req, res) {
    console.log("UsuarioController@validarExistenciaDeUsuario");
    try {
      const { numDoc } = req.body;            
      const usuarioExistente = new UsuarioExistente(numDoc);
      const result = await usuarioExistente.exec();
      return res
        .status(200)
        .json({
          existe: result,
          error: false
        });
    } catch (error) {
      console.log("ERROR UsuarioController@validarExistenciaDeUsuario");
      console.error(error);
      return res
        .status(500)
        .json({
          success: false,
          error: true
        }); 
    }
  }

  static async salvarUsuarioFlujoSolicitud(req, res) {
    console.log("UsuarioController@salvarUsuarioFlujoSolicitud");
    try {
      const data = req.body;
      const { num_doc, password } = data;
      let clienteExiste = false;

      const caseRegistro = new RegistrarUsuario(data);
      await caseRegistro.exec();

      const login = new Login({ num_doc, password }); 
      const token = await login.exec();

      const cliente = await ClientesRepository.findSome({
        num_doc: this.data.num_doc
      });

      if (!!cliente) {
        clienteExiste = true; 
      }

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.ENV === "production"
        })
        .status(200)
        .json({
          message: "Usuario registrado exitosamente",
          dat: {
            usuario: caseRegistro.usuario,
            clienteExiste
          }
        }); 
    } catch (error) {
      console.log("ERROR UsuarioController@salvarUsuarioFlujoSolicitud");
      console.error(error);
      return res.status(400).json({ error });
    }
  }

  static async crearUsuarioFlujoInicial(req, res) {
    console.log("UsuarioController@crearUsuarioFlujoInicial");
    try {
      const { codigo, dataUsuario } = req.body;
      const useCase = new CrearUsuarioFlujoInicial(codigo, dataUsuario);  
      await useCase.exec();
      
      return res
        .cookie("access_token", useCase.token, { httpOnly: true, secure: process.env.ENV === "production" })
        .status(201)
        .json({
          msg: "Usuario registrado exitosamente",
          success: true,
          dat: {
            cliente: useCase.clienteExiste // true || false
          }
        }); 
    } catch (error) {
      console.log("ERROR UsuarioController@crearUsuarioFlujoInicial");
      console.error(error);
      return res
        .status(500)
        .json({
          msg: "Ocurrió un error",
          error,
        });
    }
  }
}

module.exports = UsuarioController;
