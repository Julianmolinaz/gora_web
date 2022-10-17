const Referencia = require("../models/referencia.model");

class ReferenciasRepository {
  static async getEnumValues(campo) {
    const items = await Referencia.getAttributes()[campo].values;
    return items;
  }

  static async crear(data, transaction = null) {
    try {
      const referencia = await Referencia.create(
        data,
        { transaction }
      );
    } catch (err) {
      throw err;
    }
  }

  static async eliminarTodo() {
    await Referencia.destroy({ where: {} });
  }

  /**
   *@parm {Number} solilicitudId
   */
  static async findSolicitud(solicitudId) {
    try {
      const referencias = await Referencia.findAll({
        where: { precredito_id: solicitudId }
      });
      return referencias;
    } catch (err) {
      console.log(err)
      throw err;
    } 
  }

  static async actualizar(referenciaId, dataReferencia, transaction = null) {
    try {
      const referencia = await Referencia.update(
        dataReferencia,
        { 
          where: { id: referenciaId },
          transaction
        }
      );
    } catch (err) {
      throw err; 
    }
  }
}

module.exports = ReferenciasRepository;
