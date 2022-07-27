const CodigosRepository = require("../../database/repositories/codigos.repository");

class ValidarCodigoTerminos {
  constructor(numDoc, codigo, transaction = null) {
    this.numDoc = numDoc;
    this.codigo = codigo;
    this.transaction = transaction;
  }

  async exec() {
    return await this.getRegistroCodigo();
  }

  async getRegistroCodigo() {
    const arrCodigo = await CodigosRepository.findExist({
      num_doc: this.numDoc,
      codigo: this.codigo,
      estado: 'PROCESO'
    });

    if (arrCodigo.length) {
      const result = await CodigosRepository.update(
        arrCodigo[0].id, 
        { estado: 'CONFIRMADO' },
        this.transaction
      );
      return true;
    }
    return false;
  }
}

module.exports = ValidarCodigoTerminos;
