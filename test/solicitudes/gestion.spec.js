const { expect } = require("chai");
const { app } = require("./../../app"); 
const api = require("supertest")(app);

const ClientesRepository = require("./../../src/database/repositories/clientes.repository");
const SolicitudesRepository = require("./../../src/database/repositories/solicitudes.repository");
const VehiculosRepository = require("./../../src/database/repositories/vehiculos.repository");
const VentasRepository = require("./../../src/database/repositories/ventas.repository");
const UsuariosRepository = require("./../../src/database/repositories/usuarios.repository");

const CrearCliente = require("./../../src/services/clientes/crear_cliente");
const ValidarSolicitud = require("./../../src/services/solicitudes/validar_solicitud");
const CrearSolicitud = require("./../../src/services/solicitudes/crear_solicitud");
const CrearSolicitudCompleta = require("./../../src/services/solicitudes/crear_solicitud_completa");
const RegistrarUsuario = require("./../../src/services/usuarios/registrar_usuario.js");

const dataCliente = require("./../_mocks/cliente.mock");
const dataSolicitud = require("./../_mocks/solicitud.mock");
const dataSimulador = require("./../_mocks/simulador.mock");
const usuario = require("./../_mocks/usuario.mock.js");

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

describe("Crear solicitud", () => {
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

  it("Instanciar solicitud completa con datos vacios", async () => {
    try {
      const caseSolicitud = new CrearSolicitudCompleta({}, {}); 
      await caseSolicitud.exec();
    } catch (error) {
      expect(error).to.exist;
    }
  });

  it("Crear solicitud completa", async () => {
    try {
      const datCliente = JSON.parse(JSON.stringify(dataCliente));
      const datSimulador = JSON.parse(JSON.stringify(dataSimulador));

      const usuario = await crearUsuario();

      const caseSolicitud = new CrearSolicitudCompleta(datCliente, datSimulador, usuario.id);
      await caseSolicitud.exec();
      
      caseSolicitud.vehiculos.forEach(async (vehiculo) => {
        await destroyVehiculo(vehiculo.id);
      });
      caseSolicitud.ventas.forEach(async (venta) => {
        await destroyVenta(venta.id);
      });
      await destroySolicitud(caseSolicitud.solicitud.id);
      await destroyCliente(caseSolicitud.cliente.id);
      await UsuariosRepository.eliminar(usuario.id);
    } catch (error) {
      throw error;
    }
  });
});

/**
describe("API SOLICITUD", () => {
  it("POST api/solicitudes/store-with-cliente", async () => {
    const datCliente = JSON.parse(JSON.stringify(dataCliente));
    const datSimulador = JSON.parse(JSON.stringify(dataSimulador));

    const res = await api.post("/api/solicitudes/store-with-cliente")
      .send({ 
        cliente: datCliente,
        simulador: datSimulador
      });

    const el = res.body.dat;
    await VentasRepository.eliminarTodo();
    await VehiculosRepository.eliminarTodo();
    await destroySolicitud(el.solicitudId);
    await destroyCliente(el.clienteId);
  })
});

**/
const crearUsuario = async () => {
  const dataUsuario = JSON.parse(JSON.stringify(usuario)); 
  const registrarUsuario = new RegistrarUsuario(dataUsuario);
  await registrarUsuario.exec();
  return registrarUsuario.usuario;
}

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

const destroyVehiculo = async (vehiculoId) => {
  await VehiculosRepository.eliminar(vehiculoId);
}

const destroyVenta = async (ventaId) => {
  await VentasRepository.eliminar(ventaId);
}
