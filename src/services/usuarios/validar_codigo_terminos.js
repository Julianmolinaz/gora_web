const CodigosRepository = require("../../database/repositories/codigos.repository");

class ValidarCodigoTerminos {
  constructor(numDoc, codigo) {
    this.numDoc = numDoc;
    this.codigo = codigo;
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

    console.log({ arrCodigo });
  
    if (arrCodigo.length) {
      const result = await CodigosRepository.update(arrCodigo[0].id, { estado: 'CONFIRMADO' });
      return true;
    }
    return false;
  }
}

module.exports = ValidarCodigoTerminos;
