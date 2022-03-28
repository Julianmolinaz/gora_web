const GetPrecio = require("./../../../src/services/simulador/get_precio");
const GetValorCuota = require("./../../../src/services/simulador/get_valor_cuota");

describe("Obter valor cuota", () => {
  it("calculo del valor cuota", () => {
    const data = {
      productoId: 2,
      tipoVehiculoId: 4,
      cilindraje: 1200,
      modelo: 2020,
      precio: 510524,
      numCuotas: 10,
      periodo: "Mensual"
    };
    
    const useCase = new GetPrecio(data);
    useCase.execute()
      .then(precio => {
	const valorCuotaCase = new GetValorCuota(precio, data.numCuotas, data.periodo);
	valorCuotaCase.execute()
	  .then(valorCuota => console.log({valorCuota}));
      });
  });
});
