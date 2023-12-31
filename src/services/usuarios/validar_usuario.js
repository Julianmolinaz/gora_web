const validator = require("validator");
const ValidadorHp = require("./../../helpers/validador"); 
const UsuariosRepository = require("./../../database/repositories/usuarios.repository");
const { ValidationError, UniqueError } = require("./../../errors");

class ValidarUsuario {
  constructor(data) {
    console.log("Users@ValidarUsuario");
    this.data = data;
    this.errors = [];
  }

  exec() {
    this.validarNumDoc();
    this.validarTipoDoc();
    this.validarPassword();
    this.validarConfirm();
    this.validarPrimerNombre();
    this.validarPrimerApellido();
    this.validarCelular();
    this.validarEmail();
  }

  fails() {
    return (this.errors.length > 0) ? true : false;
  }
  
  validarTipoDoc() {
    if (ValidadorHp.isEmpty(this.data.tipo_doc)) {
      this.errors.push(["El tipo de documento no existe"]);
    }
  }

  async validarNumDoc() {
    if (ValidadorHp.isEmpty(this.data.num_doc)) {
      this.errors.push(["El número de documento no existe"]);
    }
  }

  validarPassword() {
    if (ValidadorHp.isEmpty(this.data.password)) {
      this.errors.push(["La contraseña es requerida"]);
    }
  }

  validarConfirm() {
    if (ValidadorHp.isEmpty(this.data.password)) {
      this.errors.push(["La confirmación de la contraseña es requerida"]);
    } else {
      if (! validator.equals(this.data.password, this.data.confirm)) {
        this.errors.push(["La confirmación de la contraseña no coincide"]);
      }
    }
  }

  validarPrimerNombre() {
    if (ValidadorHp.isEmpty(this.data.primer_nombre)) {
      this.errors.push(["El primer nombre es requerido"]);
    }
  }

  validarPrimerApellido() {
    if (ValidadorHp.isEmpty(this.data.primer_apellido)) {
      this.errors.push(["El primer apellido es requerido"]);
    }
  }

  validarCelular() {
    if (ValidadorHp.isEmpty(this.data.movil)) {
      this.errors.push(["El teléfono celular es requerido"]);
    }
  }

  validarEmail() {
    if (ValidadorHp.isEmpty(this.data.email)) {
      this.errors.push(["El correo electrónico es requerido"]);
    } else {
      if (!validator.isEmail(this.data.email)) {
        this.errors.push(["El correo electrónico no tiene el formato requerido"]);
      }
    }
  }
}

module.exports = ValidarUsuario;
