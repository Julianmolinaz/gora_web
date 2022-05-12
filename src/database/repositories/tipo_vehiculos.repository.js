const TipoVehiculo = require("../models/tipo_vehiculo.model");

class TipoVehiculosRepository {
  static async list() {
    try {
      const tipoVehiculos = await TipoVehiculo.findAll({
        where: { estado: "Activo" },
        order: ["nombre"]
      });
      return tipoVehiculos;
    } catch (err) {
      throw err;
    } 
  }
}

module.exports = TipoVehiculosRepository;
