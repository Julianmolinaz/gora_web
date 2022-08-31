const ValidarUsuario = require("./validar_usuario");
const UsuariosRepository = require("../../database/repositories/usuarios.repository");
const CodigosRepository = require("../../database/repositories/codigos.repository");
const { ValidationError, UniqueError } = require("./../../errors");
const { generarCodigo } = require("../../helpers/getters");
const { sendSms } = require("../notificaciones/simple_textual_message"); 

class GenerarCodigoUsuarioNuevo {
  constructor(data) {
    this.data = data;
    this.codigo = null;
  }

  async exec() {
    try {
      this.validarDatos();
      //await this.existeUsuario();
      this.generarCodigo();
      await this.guardarCodigo();
      await this.enviarCodigo();
      return true;
    } catch (error) {
      throw error;
    }
  }

  generarCodigo(){
    this.codigo = generarCodigo(4);
    console.log('CODIGO PARA ACEPTAR TERMINOS: ', {
      doc: this.data.num_doc,
      codigo: this.codigo,
      movil: this.data.movil
    });
  }

  async guardarCodigo(){
    const data = {
      codigo: this.codigo,
      num_doc: this.data.num_doc,
      movil: this.data.movil
    };
    await CodigosRepository.crear(data); 
  }

  async enviarCodigo() {
    const response = await sendSms(
      "INVERSIONES GORA SAS",
      process.env.COUNTRY_CODE + this.data.movil,
      `GORA: para aceptar terminos y condiciones escriba el siguiente codigo: ${this.codigo}`
    ); 
    return response;
  }
  
  async existeUsuario() {
    const resultUsuario = await UsuariosRepository.findNumDoc(
      this.data.num_doc
    );
    if (resultUsuario) {
      throw new UniqueError("Ya existe un usuario registrado, de click en ingresar en el menú superior");
    }
  }
  validarDatos() {
    const validacion = new ValidarUsuario(this.data);
    validacion.exec();
    if (validacion.fails()) {
      throw new ValidationError(validacion.errors);
    }
  }
}

module.exports = GenerarCodigoUsuarioNuevo;
