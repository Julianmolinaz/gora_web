
const validator = require('validator');
const ValidadorHp = require("./../../helpers/validador"); 
const { ValidationError, SimpleError } = require("../../errors");
const {
  UsuariosRepository,
  ClientesRepository
} = require("../../database/repositories");

class EsUsuario {
  constructor(dataUsuario) {
    this.dataUsuario = dataUsuario;
    this.errors = [];
  }

  static async make(dataUsuario) {
    const instance = new this(dataUsuario);
    await instance.validateUser();
    const existeUsuario_ = await instance.existeUsuario();

    if (existeUsuario_) {
      return true;
    } else {
      await instance.validarCliente();
      return false;
    }
  }

  async validateUser() {
    if (ValidadorHp.isEmpty(this.dataUsuario.num_doc)) {
      this.errors.push(['El número de documento es requerido']);
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.movil)) {
      this.errors.push(['El teléfono celular es requerido']);
    }
    if (this.errors.length) {
      throw new ValidationError(this.errors);
    }
  }

  async existeUsuario() {
    const usuario = await UsuariosRepository.findNumDoc(
      this.dataUsuario.num_doc
    );
    return usuario ? true : false;
  }

  async validarCliente() {
    const cliente = await ClientesRepository.findSome(
      { num_doc: this.dataUsuario.num_doc }
    );

    if (!cliente) return true;

    if (cliente.movil == this.dataUsuario.movil) {
      return true;
    } else {
      throw new SimpleError("No se puede crear la cuenta, comunìquese con un asesor. Gracias!!!");
    }
  }
}

module.exports = EsUsuario;
