const Vehiculo = require("../models/vehiculo.model");

class VehiculosRepository {
  static async crear(data) {
    const vehiculo = await Vehiculo.create(data); 
    return vehiculo;
  }

  static async eliminar(vehiculoId) {
    await Vehiculo.destroy({
      where: { id: vehiculoId },
    })
  }
}

module.exports = VehiculosRepository;
