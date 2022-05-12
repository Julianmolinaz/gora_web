const GetInsumos = require("../services/simulador/get_insumos");
const GetPrecio = require("../services/simulador/get_precio");
const GetValorCuota = require("../services/simulador/get_valor_cuota");

class SimuladorController {
  static  async getInsumos(req, res) {
    const useCase = new GetInsumos(); 
    const insumos = await useCase.execute();
    return res.json({ insumos });
  }

  static async calcularValorCuota(req, res) {
    try {
      const body = req.body;

      const getPrecioUseCase = new GetPrecio(body);
      const precio = await getPrecioUseCase.execute();

      const cuota = new GetValorCuota(
    	precio, body.numCuotas, body.periodo
      );
      await cuota.execute();

      return res.json({
        precio: cuota.precioProducto,
        valorCuota: cuota.valorCuota,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.toString() });
    }
  }
}

module.exports = SimuladorController;
