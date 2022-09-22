const Solicitud = require("../models/solicitud.model");
const { QueryTypes } = require("sequelize");
const main = require("../conexiones/main.conexion");

class SolicitudesRepository {

  static async find(solicitudId) {
    const solicitud = await Solicitud.findByPk(solicitudId);
    return solicitud;
  }

  static async findWithIdAndCliente(solicitudId, clienteId) {
    const solicitud = await Solicitud.findOne({
      where: { id: solicitudId, cliente_id: clienteId }
    });

    return solicitud;
  }

  static getPeriodos() {
    try {
      const periodos = Solicitud.rawAttributes.periodo.values;
      return periodos;
    } catch (error) {
      throw error;
    }
  }

  static async findSolicitudesActivasByCliente(clienteId) {
    /*
    const [results, metadata] = await mainConexion.query(
      `
        SELECT precreditos.* 
        FROM precreditos
        LEFT JOIN creditos on precreditos.id = creditos.precredito_id
        WHERE precreditos.cliente_id = ${clienteId}
        AND precreditos.aprobado IN ('En estudio', 'Si')
        AND creditos.id IS NULL
      `
    );

    return results;
    */
  }
  
  static async crear(data, transaction =  null) {
    try {
      const solicitud = await Solicitud.create(
        data,
        { transaction }
      );
      return solicitud;
    } catch (error) {
      throw error;
    } 
  }

  static async eliminar(solicitudId) {
    await Solicitud.destroy({
      where: { id: solicitudId },
    });
  }

  static async listPorCliente(clienteId) {
    const solicitudes = await Solicitud.findAll({
      where: { cliente_id: clienteId },
      order: [[ 'created_at', 'DESC' ]]
    });

    return solicitudes;
  }

  static async listPorNumDoc(num_doc) {
    const solicitudes = await Solicitud.findAll({
      where: { num_doc },
      order: [[ 'created_at', 'DESC' ]]
    });

    return solicitudes;
  }

  static async ultimaSolicitudNumDoc(num_doc) {
    console.log("ultima solicitud");
    const solicitud = await main.query(
      `
        SELECT 
          precreditos.aprobado,
          creditos.estado
        FROM precreditos
        INNER JOIN clientes ON precreditos.cliente_id = clientes.id
        LEFT JOIN creditos ON precreditos.id = creditos.precredito_id
        WHERE clientes.num_doc = ${num_doc}
        ORDER BY precreditos.id DESC
        LIMIT 1
      `,
      { type: QueryTypes.SELECT }
    );    

    return solicitud ? solicitud[0] : null;
  }
}

module.exports = SolicitudesRepository;
