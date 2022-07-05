const Documento = require("./../models/documento.model");

class DocumentosRepository {
  static async create(data, transaction = null) {
    try {
      const documento = await Documento.create(
        data,
        { transaction }
      ); 
      return documento;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DocumentosRepository;
