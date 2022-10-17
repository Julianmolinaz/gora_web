const validator = require('validator');
const ValidadorHp = require("./../../helpers/validador"); 
const { ValidationError, UniqueError } = require("../../errors");
const { UsuariosRepository } = require("../../database/repositories");

const RegistroInicial = function(dataUser, transaction = null) {
  console.log("Users@RegistroInicial");
  this.dataUser = dataUser;
  this.errors = [];
  this.usuario = null;
  this.transaction = transaction;

  this.exec = async () => {
    await validateUser();
    await saveUser();
  }

  const validateUser = async () => {
    if (ValidadorHp.isEmpty(this.dataUser.num_doc)) {
      this.errors.push(['El número de documento es requerido']);
    }
    else {
      if (await existUser()) {
        throw new UniqueError('Ya existe un usuario registrado');
      }
    }
    if (ValidadorHp.isEmpty(this.dataUser.movil)) {
      this.errors.push(['El teléfono celular es requerido']);
    }
    if (ValidadorHp.isEmpty(this.dataUser.password)) {
      this.errors.push(['La contraseña es requerida']);
    }
    else {
      if(!validator.equals(this.dataUser.password, this.dataUser.confirm)) {
        this.errors.push(['La confirmación de la contraseña no coincide']);
      }
    }
    if (this.errors.length) {
      throw new ValidationError(this.errors);
    }
  }

  const existUser = async () => {
    const result = await UsuariosRepository.findNumDoc(dataUser.num_doc);
    return !!result;
  }

  const saveUser = async () => {
    this.usuario = await UsuariosRepository.save(
      dataUser, this.transaction
    );
  }

}

module.exports = RegistroInicial;
