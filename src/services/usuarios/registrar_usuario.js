const ValidarUsuario = require("./validar_usuario");
const UsuariosRepository = require("../../database/repositories/usuarios.repository");
const ClientesRepository = require("../../database/repositories/clientes.repository");
const CodigoRepository = require("../../database/repositories/codigos.repository");
const { ValidationError, UniqueError } = require("./../../errors");

class RegistrarUsuario {
  constructor(data) {
    this.data = data;
    this.usuario = null;
  }

  async exec() {
    try {
      this.validarDatos();
      await this.existeUsuario();
      //await this.existeCliente();
      await this.registrar();
      return this.usuario;
    } catch (error) {
      throw error;
    }
  }

  async existeUsuario() {
    const resultUsuario = await UsuariosRepository.findNumDoc(
      this.data.num_doc
    );
    if (resultUsuario) {
      throw new UniqueError("Ya existe un usuario registrado");
    }
  }


  //async existeCliente() {
  //  const resultCliente = await ClientesRepository.findSome({
  //    num_doc: this.data.num_doc
  //  });

  //  if (!!resultCliente) {
  //    throw new UniqueError("Ya existe un cliente registrado"); 
  //  }
  //}

  validarDatos() {
    const validacion = new ValidarUsuario(this.data);
    validacion.exec();
    if (validacion.fails()) {
      throw new ValidationError(validacion.errors);
    }
  }

  async registrar() {
    this.usuario = await UsuariosRepository.save(this.data); 
  }
}

module.exports = RegistrarUsuario;
