const local = require("../../database/conexiones/local.conexion");
const { SimpleError, ValidationError } = require("../../errors");

const ValidarCodigoTerminos = require("./validar_codigo_terminos");
const ValidarUsuario = require("./validar_usuario");
const { getAccessToken } = require("../../helpers/getters");
//const Login = require("./../auth/login");

const UsuariosRepository = require("../../database/repositories/usuarios.repository");
const ClientesRepository = require("../../database/repositories/clientes.repository");

let codigo = null;

class CrearUsuarioFlujoInicial {
  constructor(code, dataUsuario) {
    codigo = code;
    this.dataUsuario = dataUsuario;
    this.usuario = null;
    this.cliente = false;
    this.token = null;
  }

  async exec() {
    try {
      this.transaction = await local.transaction();

      await this.validarDataUsuarioNuevo();

      await this.validarCodigoTerminos();

      await this.crearUsuario();

      await this.validarSiClienteExiste();
      
      await this.getToken();

      this.transaction.commit();

    } catch (error) {
      throw error;
      this.transaction.rollback();
    }
  }

  async validarDataUsuarioNuevo() {
    const validarUsuario = new ValidarUsuario(this.dataUsuario);
    await validarUsuario.exec();
    
    if (validarUsuario.fails()) {
      throw new ValidationError(validarUsuario.errors);
    }
  }

  async validarCodigoTerminos() {
    const validarCodigoTerminos = new ValidarCodigoTerminos(
      this.dataUsuario.num_doc,
      codigo,
      this.transaction
    ); 
    const success = await validarCodigoTerminos.exec();
    if (!success) {
      throw new SimpleError("El código no es correcto"); 
    } 
  }

  async crearUsuario() {
    this.usuario = await UsuariosRepository.save(
      JSON.parse(JSON.stringify(this.dataUsuario)),
      this.transaction
    ); 
  }

  async validarSiClienteExiste() {
    const cliente = await ClientesRepository.findSome({
      num_doc: this.dataUsuario.num_doc
    }); 
    this.cliente = !!cliente;
  }

  async getToken() {
    this.token = await getAccessToken(
      this.usuario.id,
      this.usuario.primer_nombre +" "+ this.usuario.primer_apellido,
      null
    );
  }
}

module.exports = CrearUsuarioFlujoInicial;
