const validator = require("validator");
const Usuario = require("./../../database/repositories/usuarios.repository");
const ValidadorHp = require("./../../helpers/validador"); 
const { comparar } = require("./../../helpers/bcrypt"); 
const jwt = require("jsonwebtoken");

/*
 * data = { num_doc: ..., password: ... }
 */

class Login {
  constructor(data = {}) {
    this.data = data;
    this.usuario = null;
    this.errors = [];
  }

  async exec() {
    try {
      this.validarExistenciaDeDatos();
      await this.getUsuario();

      const result = await comparar(
        this.data.password,
        this.usuario.password
      );

      if(result) {
        const token = await this.getToken(
          this.usuario.id,
          this.usuario.primer_nombre +" "+ this.usuario.primer_apellido,
        );
        return token;
      } else {
        throw "Credenciales invalidas";
      }
    } catch (error) {
      throw error;
    }
  }

  async getToken(usuarioId, nombre) {
    const token = await jwt.sign({
      name: nombre,
      id: usuarioId
    }, process.env.TOKEN_SECRET);

    return token;
  }

  validarExistenciaDeDatos() {
    if (ValidadorHp.isEmpty(this.data.num_doc)) {
      this.errors.push(["El número de documento es requerido"]);
    }

    if (ValidadorHp.isEmpty(this.data.password)) {
      this.errors.push(["La contraseña es requerida"]);
    }

    if (this.errors.length > 0) {
      throw JSON.stringify(this.errors);
    }
  }

  async getUsuario() {
    this.usuario = await Usuario.findNumDoc(this.data.num_doc);
    if (!this.usuario) {
      throw "Credenciales invalidas";
    }
  }
}

module.exports = Login;
