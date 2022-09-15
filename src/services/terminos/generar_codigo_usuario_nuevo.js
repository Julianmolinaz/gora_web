const { CodigosRepository } = require("../../database/repositories");
const { ValidationError } = require("../../errors");
const ValidadorHp = require("../../helpers/validador"); 
const { generarCodigo } = require("../../helpers/getters");
const { sendSms } = require("../notificaciones/simple_textual_message"); 

const GenerarCodigoUsuarioNuevo = function (dataUsuario) {
  this.dataUsuario = dataUsuario;
  const errors = [];
  this.codigo = '';

  this.exec = async () => {
    validarDatos();
    await getCodigo();
    await guardarCodigo(); 
    await enviarCodigo();  
  }

  const validarDatos = () => {
    if (ValidadorHp.isEmpty(this.dataUsuario.num_doc)) {
      errors.push(["El númeo de documento es requerido"]);
    }
    if (ValidadorHp.isEmpty(this.dataUsuario.movil)) {
      errors.push(["El teléfono celular es requerido"]);
    }
    if (!ValidadorHp.mobilePhone(this.dataUsuario.movil)) {
      errors.push(['El teléfono celular no es un número valido']);
    }

    if (errors.length) {
      throw new ValidationError(errors)
    }
  }

  const getCodigo = () => {
    this.codigo = generarCodigo(process.env.DIGITOS_CODIGO_TERMINOS); 
  }

  const guardarCodigo = async () => {
    await CodigosRepository.crear({
      codigo: this.codigo,
      num_doc: this.dataUsuario.num_doc,
      movil: this.dataUsuario.movil
    });
  }

  const enviarCodigo = async () => {
    const from = "INVERSIONES GORA SAS";
    const to = process.env.COUNTRY_CODE + this.dataUsuario.movil;
    console.log(to);
    const message = `DE GORA: digite el codigo ${this.codigo} para aceptar terminos y condiciones.`;
    const response = await sendSms(from, to, message);
    console.log({ response });
    return response;
  }
}

module.exports = GenerarCodigoUsuarioNuevo;
