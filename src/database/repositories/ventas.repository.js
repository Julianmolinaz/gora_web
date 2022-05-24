const Venta = require("../models/venta.model");

class VentasRepository {
  static async crear(data) {
    const venta = await Venta.create(data);
    return venta;
  }

  static async eliminar(ventaId) {
    await Venta.destroy({
      where: { id: ventaId },
    }); 
  }
}

module.exports = VentasRepository;
