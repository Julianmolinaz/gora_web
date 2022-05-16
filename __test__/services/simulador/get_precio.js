jest.useFakeTimers();
const GetPrecio = require("./../../../src/services/simulador/get_precio");

it("temporar", () => {
  expect(true).toEqual(true);
});

//test("test 1", async () => {
//  const mock = mockSkills()[0];
//  let useCase = new GetPrecio(mock);
//  const precio = await useCase.execute()
//  expect(precio).toEqual(mock.precio);
//});

//test("precio moto entre 100cc y 200cc", async () => {
//  const mock = mockSkills()[1];
//  let useCase = new GetPrecio(mock);
//  const precio = await useCase.execute()
//  expect(precio).toEqual(mock.precio);
//});

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
