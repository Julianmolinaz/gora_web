const Documento = require("./../models/documento.model");
const { Op } = require("sequelize");

class DocumentosRepository {

  /**
   * query = { nombre: "2938_cedula_frente" }
   */

  static async findSome(query) {
    try {
      const documento = await Documento.findOne({
        where: query
      });
      return documento;
    } catch (err) {
      console.error(err);
    }
  }

  static async listSome(query) {
    try {
      const documentos = await Documento.findAll({
        where: query
      });
      return documentos;
    } catch (err) {
      console.error(err);
    }
  }

  static async findByName(nombre) {
    try {
      const documento = await Documento.findOne({
        where: {
          nombre: { [Op.like]: nombre + "%" } 
        }
      });
      return documento;
    } catch (err) {
      console.error(err);
    }
  }

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

  static async update(docId, dataDoc, transaction = null) {
    try {
      const documento = await Documento.update(
        { ...dataDoc, updated_at: new Date()},
        { where: { id: docId } }
      );
      return documento;
    } catch (error) {
      console.error(error);
    }
  }

  static async destroy(docId, transaction = null) {
    try {
      const result = await Documento.destroy({
        where: { id: docId },
        transaction
      });
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = DocumentosRepository;
