const Venta = require("../models/venta.model");
const main = require("../conexiones/main.conexion");
const { QueryTypes } = require("sequelize");

class VentasRepository {
  static async crear(data, transaction = null) {
    const venta = await Venta.create(
      data,
      { transaction }
    );
    return venta;
  }

  static async eliminar(ventaId) {
    await Venta.destroy({
      where: { id: ventaId },
    }); 
  }

  static async eliminarTodo() {
    await Venta.destroy({
      where: {},
    });
  }

  static async obtenerPorSolicitud(solicitudId) {
    const [results, metadata] = await main.query(`
      SELECT 
        ventas.id as venta_id,
        ventas.valor as venta_valor,
        productos.nombre as producto,
        vehiculos.placa as vehiculo_placa,
        vehiculos.modelo as vehiculo_modelo,
        vehiculos.cilindraje as vehiculo_cilindraje,
        tipo_vehiculos.nombre as tipo_vehiculo,
        tipo_vehiculos.id as tipo_vehiculo_id
      FROM ventas
      INNER JOIN productos ON ventas.producto_id = productos.id
      INNER JOIN vehiculos ON ventas.vehiculo_id = vehiculos.id
      INNER JOIN tipo_vehiculos ON vehiculos.tipo_vehiculo_id = tipo_vehiculos.id
      WHERE ventas.precredito_id = ${solicitudId}
      AND productos.id IN (1, 2)
    `);
    
    return results;
  }
}

module.exports = VentasRepository;
