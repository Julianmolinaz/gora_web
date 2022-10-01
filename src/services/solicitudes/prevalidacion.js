const {
  CodigosRepository, SolicitudesRepository 
} = require("../../database/repositories");
const ObtenerTipoUsuario = require("../../services/users/obtener_tipo_usuario");
const moment = require('moment');

class Prevalidacion {
  constructor(numDoc) {
    this.numDoc = numDoc;
    this.result = true;
  }

  async exec() {
    const solActivas = await this.solicitudesActivas();
    const codConfirmados = await this.codigosConfirmados();

    if (!solActivas && codConfirmados) return true;
    return false;
  }

  async solicitudesActivas() {
    const tipoUsuario = new ObtenerTipoUsuario(this.numDoc);
    const vector = await tipoUsuario.exec();
    return vector[2] == 1 ? true : false;
  }

  async codigosConfirmados() {
    const codigos = await CodigosRepository.findConfirmado(
      this.numDoc, moment().format('YYYY-MM-DD') 
    );
    return codigos ? true : false;
  }

}

module.exports = Prevalidacion;
