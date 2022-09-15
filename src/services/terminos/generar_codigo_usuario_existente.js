const { UsuariosRepository, CodigosRepository } = require("../../database/repositories");
const { ValidationError, SimpleError } = require("../../errors");
const ValidadorHp = require("../../helpers/validador"); 
const { generarCodigo } = require("../../helpers/getters");
const { sendSms } = require("../notificaciones/simple_textual_message"); 


const GenerarCodigoUsuarioExistente = function (usuarioId) {
  if (!usuarioId) {
    throw new SimpleError("No se puede generar el codigo, por favor pongase en constacto con un asesor");
  }
  this.usuarioId = usuarioId;
  this.usuario = null;
  this.codigo = null;

  this.exec = async () => {
    await getUsuario();
    await getCodigo();
    await guardarCodigo();
    await enviarCodigo();
  }

  const getUsuario = async () => {
    this.usuario = await UsuariosRepository.find(this.usuarioId);
    if (!this.usuario) {
      throw new SimpleError("El usuario no se encuentra registrado");
    }
  }

  const getCodigo = async () => {
    this.codigo = generarCodigo(process.env.DIGITOS_CODIGO_TERMINOS);
    if (!this.codigo) {
      throw new SimpleError("No se pudo generar el código para aceptar términos");
    }
  }

  const guardarCodigo = async () => {
    await CodigosRepository.crear({
      codigo: this.codigo,
      num_doc: this.usuario.num_doc,
      movil: this.usuario.movil
    });
  }

  const enviarCodigo = async () => {
    try {
      const from = "INVERSIONES GORA SAS";
      const to = process.env.COUNTRY_CODE + this.dataUsuario.movil;
      const message = `DE GORA: digite el codigo ${this.codigo} para aceptar términos y condiciones.`;
      return response;
    } catch (err) {
      throw SimpleError("Se presento un error al enviar el código para haceptar términos y codiciones");
    }
  }

}
