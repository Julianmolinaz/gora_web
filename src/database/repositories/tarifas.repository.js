const Tarifa = require("../models/tarifa.model");

class TarifasRepository {
  static async tarifasPorTipoVehiculo(tipoVehiculoId) {
    try {
      const tarifa = await Tarifa.findAll({
        where: { tipo_vehiculo_id: tipoVehiculoId },
      }); 
      return tarifa;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = TarifasRepository;
