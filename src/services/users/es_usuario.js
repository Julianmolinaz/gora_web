const validator = require('validator');
const ValidadorHp = require("./../../helpers/validador"); 
const { ValidationError, SimpleError } = require("../../errors");
const ObtenerTipoUsuario = require("./obtener_tipo_usuario");
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
    const tipo = await instance.getTipoUsuario();
    return tipo;
  }

  async validateUser() {
    if (ValidadorHp.isEmpty(this.dataUsuario.num_doc)) {
      this.errors.push(['El número de documento es requerido']);
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.movil)) {
      this.errors.push(['El teléfono celular es requerido']);
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.password)) {
      this.errors.push(['La contraseña es requerida']);
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.confirm)) {
      this.errors.push(['La contraseña es requerida']);
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

  async getTipoUsuario() {
    const tipo = new ObtenerTipoUsuario(this.dataUsuario.num_doc);
    await tipo.exec(); 

    if (tipo.vector[1]) {
      if (tipo.cliente.movil != this.dataUsuario.movil) {
        throw new SimpleError("No se puede crear la cuenta, comunìquese con un asesor. Gracias!!!");
      } 
    } 
    return tipo.vector;
  }
}

module.exports = EsUsuario;
