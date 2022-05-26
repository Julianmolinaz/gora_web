const Solicitud = require("../models/solicitud.model");
//const mainConexion = require("../conexiones/main.conexion");

class SolicitudesRepository {
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
}

module.exports = SolicitudesRepository;
