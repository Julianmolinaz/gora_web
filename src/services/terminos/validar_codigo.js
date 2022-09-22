const { CodigosRepository } = require("../../database/repositories");
const { SimpleError } = require("../../errors");

class ValidarCodigoTerminos {
  constructor(num_doc, codigo, transaction = null) {
    this.num_doc = num_doc;
    this.codigo = codigo;
    this.transaction = transaction;
  }

  async exec() {
    const result = await this.getRegistroCodigo();

    if (result) {
      await this.updateEstadoCodigo(result);
    } else {
      throw new SimpleError("El código no es valido"); 
    }
  }

  async getRegistroCodigo() {
    const result = await CodigosRepository.findOneSome({
      num_doc: this.num_doc,
      codigo: this.codigo,
      estado: 'PROCESO'
    });
    return result;
  }

  async updateEstadoCodigo(codigo) {
    await CodigosRepository.update(
      codigo.id,
      { estado: "CONFIRMADO" },
      this.transaction
    ); 
  }
}

module.exports = ValidarCodigoTerminos;
