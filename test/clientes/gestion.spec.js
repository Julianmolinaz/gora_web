const { expect } = require("chai");
const api = require("supertest")(require("./../../app"));
const ValidarCliente = require("./../../src/services/clientes/validar_cliente");
const CrearCliente = require("./../../src/services/clientes/crear_cliente");
const dataCliente = require("./../_mocks/cliente.mock");
const ClientesRepository = require("./../../src/database/repositories/clientes.repository");

describe("Creación de clientes", () => {
  it("Validacion data cliente", async () => {
    const validarCliente = new ValidarCliente({}, "creacion");
    await validarCliente.exec();
    expect(validarCliente.fails()).to.equal(true);
  });
  it("Crear cliente", async () => {
    try {
      const crearCliente = new CrearCliente(dataCliente);
      await crearCliente.exec();
      const cliente = crearCliente.cliente;
      expect(cliente.nombre).to.equal("Pablo Adrian Gonzalez Salazar");
      //console.log({cliente});
      await ClientesRepository.destroy(cliente.id);
    } catch (error) {
      throw error;
    }
  });
});
