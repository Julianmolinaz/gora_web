const { expect } = require("chai");
const { app } = require("./../../app"); 
const api = require("supertest")(app);

const ClientesRepository = require("./../../src/database/repositories/clientes.repository");
const SolicitudesRepository = require("./../../src/database/repositories/solicitudes.repository");
const VehiculosRepository = require("./../../src/database/repositories/vehiculos.repository");
const VentasRepository = require("./../../src/database/repositories/ventas.repository");
const ReferenciasRepository = require("./../../src/database/repositories/referencias.repository");

const CrearSolicitudCompleta = require("./../../src/services/solicitudes/crear_solicitud_completa");
const CrearReferencias = require("./../../src/services/referencias/crear_referencias");

const dataCliente = require("./../_mocks/cliente.mock");
const dataSimulador = require("./../_mocks/simulador.mock");
const dataReferencias = require("./../_mocks/referencias.mock");

describe("Gestion de referencias", () => {
  it("crear referencias", async () => {
    const datCliente = JSON.parse(JSON.stringify(dataCliente));
    const datSimulador = JSON.parse(JSON.stringify(dataSimulador));
    const datReferencias = JSON.parse(JSON.stringify(dataReferencias));
    
    const caseSolicitud = new CrearSolicitudCompleta(datCliente, datSimulador);
    await caseSolicitud.exec();

    const caseReferencias = new CrearReferencias(
      [],
      caseSolicitud.cliente.id,
      caseSolicitud.solicitud.id,
    );
    await caseReferencias.exec();

    // Eliminar datos
    await ReferenciasRepository.eliminarTodo();
    await VentasRepository.eliminarTodo();
    await VehiculosRepository.eliminarTodo();
    await SolicitudesRepository.eliminar(caseSolicitud.solicitud.id);
    await ClientesRepository.eliminar(caseSolicitud.cliente.id);
  });
});

