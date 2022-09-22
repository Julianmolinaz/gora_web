const validator = require("validator");
const UsuariosRepository = require("./../../database/repositories/usuarios.repository");
const SolicitudesRespository = require("./../../database/repositories/solicitudes.repository");
const ValidadorHp = require("./../../helpers/validador"); 
const { comparar } = require("./../../helpers/bcrypt"); 
const { getAccessToken } = require("./../../helpers/getters"); 
const jwt = require("jsonwebtoken");
const { SimpleError } = require("../../errors");

/*
 * data = { num_doc: ..., password: ... }
 */

class Login {
  constructor(data) {
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
        const token = await getAccessToken(
          this.usuario.id,
          this.usuario.primer_nombre +" "+ this.usuario.primer_apellido,
          this.usuario.cliente_id
        );
        return token;
      } else {
        throw new SimpleError("El nombre del usuario o la contraseña son incorrectos");
      }
    } catch (error) {
      throw error;
    }
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
    try {
      this.usuario = await UsuariosRepository.findNumDoc(this.data.num_doc);
      if (!this.usuario) {
        throw new SimpleError("El nombre del usuario o la contraseña son incorrectos");
      }
    } catch (error) {
      console.error("error al obtener usuario", error);
      throw new SimpleError("El nombre del usuario o la contraseña son incorrectos");
    }
  }

  
}

module.exports = Login;
