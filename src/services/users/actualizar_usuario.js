const validator = require('validator');
const ValidadorHp = require("./../../helpers/validador"); 
const { ValidationError, UniqueError } = require("../../errors");
const { UsuariosRepository } = require("../../database/repositories");

const ActualizarUsuario = function(dataUsuario, usuarioId) {
  this.dataUsuario = dataUsuario;
  this.usuarioId = usuarioId;
  this.usuario = null;
  this.errors = [];

  this.exec = async () => {
    await validateUser();
    await updateUser();
  }

  const validateUser = async () => {
    if (ValidadorHp.isEmpty(this.dataUsuario.tipo_doc)) {
      this.errors.push(['El tipo de documento es requerido']);
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.num_doc)) {
      this.errors.push(['El número de documento es requerido']);
    } else {
      if (await existUser()) {
        throw new UniqueError('Ya existe un usuario registrado con el mismo documento');
      }
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.primer_nombre)) {
      this.errors.push(['El primer nombre es requerido']);
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.primer_apellido)) {
      this.errors.push(['El primer apellido es requerido']);
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.email)) {
      this.errors.push(['El correo electrónico es requerido']);
    } else {
      if (validator.isEmail(this.dataUsuario.email)) {
        this.errors.push(['El correo electrónico no tiene el formato requerido']);
      }
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.movil)) {
      this.errors.push(['El teléfono celular es requerido']);
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.password)) {
      this.errors.push(['La contraseña es requerida']);
    } else {
      if(!validator.equals(this.dataUsuario.password, this.dataUsuario.confirm)) {
        this.errors.push(['La confirmación de la contraseña no coincide']);
      }
    }
    if (this.errors.length) {
      throw new ValidationError(this.errors);
    }
  }

  const existUser = async () => {
    const result = await UsuariosRepository.findAllSome(
      { id: this.usuarioId, num_doc: this.dataUsuario.num_doc }
    );

    return !!result;
  }

  const updateUser = async () => {
    this.usuario = await UsuariosRepository(
      this.usuarioId,
      this.dataUsuario
    );
  }
}

module.exports = ActualizarUsuario;
