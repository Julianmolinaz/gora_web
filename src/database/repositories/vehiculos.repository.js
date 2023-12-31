const Vehiculo = require("../models/vehiculo.model");

class VehiculosRepository {
  static async crear(data, transaction = null) {
    const vehiculo = await Vehiculo.create(
      data,
      { transaction }
    ); 
    return vehiculo;
  }

  static async eliminar(vehiculoId) {
    await Vehiculo.destroy({
      where: { id: vehiculoId },
    })
  }

  static async eliminarTodo() {
    await Vehiculo.destroy({
      where: {},
    }); 
  }
}

module.exports = VehiculosRepository;
