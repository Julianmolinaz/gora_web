const { expect } = require("chai");
const api = require("supertest")(require("./../../app"));

const ClientesRepository = require("./../../src/database/repositories/clientes.repository");
const SolicitudesRepository = require("./../../src/database/repositories/solicitudes.repository");

const CrearCliente = require("./../../src/services/clientes/crear_cliente");
const ValidarSolicitud = require("./../../src/services/solicitudes/validar_solicitud");
const CrearSolicitud = require("./../../src/services/solicitudes/crear_solicitud");
const CrearSolicitudCompleta = require("./../../src/services/solicitudes/crear_solicitud_completa");

const dataCliente = require("./../_mocks/cliente.mock");
const dataSolicitud = require("./../_mocks/solicitud.mock");
const dataSimulador = require("./../_mocks/simulador.mock");

/*

describe("Validacion de solicitudes", () => {
  it("Validar solicitud sin parámentros", async () => {
    const validarSolicitud = new ValidarSolicitud({}, "creacion");
    validarSolicitud.exec();
    expect(validarSolicitud.fails()).to.equals(true);
  });

  it("Validar solicitud con parámetros", () => {
    const validarSolicitud = new ValidarSolicitud(dataSolicitud, "creacion");
    validarSolicitud.exec();
    expect(validarSolicitud.fails()).to.equals(true);
  });

  it("Validar solicitud con cliente id", async () => {
    
    const cliente = await createCliente();
    const datSolicitud = JSON.parse(JSON.stringify(dataSolicitud));
  
    // asignar cliente_id a dataSolicitud 
    datSolicitud.cliente_id = cliente.id;

    // validar solicitud
    const validarSolicitud = new ValidarSolicitud(datSolicitud, "creacion");
    validarSolicitud.exec();
    const fails = validarSolicitud.fails();

    // eliminar cliente
    await destroyCliente(cliente.id);

    expect(fails).to.equals(false);
  });
});
*/

describe("Crear solicitud", () => {
  /*
  it("crear solicitud", async () => {
    const cliente = await createCliente();
    const datSolicitud = JSON.parse(JSON.stringify(dataSolicitud));
    datSolicitud.cliente_id = cliente.id;

    const crearSolicitud = new CrearSolicitud(datSolicitud);
    await crearSolicitud.exec();

    const solicitud = crearSolicitud.solicitud;

    await destroySolicitud(crearSolicitud.solicitud.id);
    await destroyCliente(cliente.id);
  });
  */

  it("Instanciar solicitud completa con datos vacios", async () => {
    //const caseSolicitud = new CrearSolicitudCompleta({}, {}); 
    //await caseSolicitud.exec();
    //this.cliente = caseCrearCliente.cliente;
  });

  it("Crear solicitud completa", async () => {
    const datCliente = JSON.parse(JSON.stringify(dataCliente));
    const datSimulador = JSON.parse(JSON.stringify(dataSimulador));

    const caseSolicitud = new CrearSolicitudCompleta(datCliente, datSimulador);
    await caseSolicitud.exec();

    const cliente = caseSolicitud.cliente;
    const solicitud = caseSolicitud.solicitud;
    
    console.log(cliente, solicitud);

    await destroySolicitud(solicitud.id);
    await destroyCliente(cliente.id);
  });
});

const createCliente = async () => {
  const crearCliente = new CrearCliente(dataCliente);
  await crearCliente.exec();
  return crearCliente.cliente;
}

const destroyCliente = async (clienteId) => {
  await ClientesRepository.eliminar(clienteId);
}

const destroySolicitud = async (solicitudId) => {
  await SolicitudesRepository.eliminar(solicitudId);
}
