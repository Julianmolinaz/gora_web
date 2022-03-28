const GetPrecio = require("./../../../src/services/simulador/get_precio");

describe("Obtener precio moto", () => {
  it("test 1", () => {
    
    const mock = mockSkills()[0];
    let useCase = new GetPrecio(mock);

    const precio = useCase.execute()
      .then(res => {
	expect(precio).toEqual(mock.precio);
      });
  });
  it("precio moto entre 100cc y 200cc", () => {
    const mock = mockSkills()[1];

    let useCase = new GetPrecio(mock);
    useCase.execute()
      .then((precio) => {
	expect(precio).toEqual(mock.precio);
      });
  });
});

const mockSkills = () => {
  return [
    {
      productoId: 3,
      tipoVehiculoId: 2,
      modelo: 2020,
      cilindraje: 90,
      precio: 510524,
    },
    {
      productoId: 3,
      tipoVehiculoId: 2,
      modelo: 2020,
      cilindraje: 100,
      precio: 636274
    }
  ];
}
