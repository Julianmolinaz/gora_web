const { expect } = require("chai");
const { app } = require("./../../app"); 

const RegistrarUsuario = require("./../../src/services/usuarios/registrar_usuario.js");
const GenerarCodigoValidacion = require("./../../src/services/terminos/generar_codigo_validacion.js");
const ValidarCodigo = require("./../../src/services/terminos/validar_codigo.js");
const UsuariosRepository = require("./../../src/database/repositories/usuarios.repository");
const usuario = require("./../_mocks/usuario.mock.js");

describe("Terminos", () => {
  it("Generar codigo de validacion", async () => {
    const dataUsuario = JSON.parse(JSON.stringify(usuario)); 
    const registrarUsuario = new RegistrarUsuario(dataUsuario);
    await registrarUsuario.exec();

    const useCase = new GenerarCodigoValidacion(registrarUsuario.usuario.id);
    const res = await useCase.exec();

    await UsuariosRepository.eliminar(useCase.usuario.id);
  });
  it("Comparar codigo de validacion", async () => {
    const dataUsuario = JSON.parse(JSON.stringify(usuario)); 
    const registrarUsuario = new RegistrarUsuario(dataUsuario);
    await registrarUsuario.exec();

    const useCase = new GenerarCodigoValidacion(registrarUsuario.usuario.id);
    const res = await useCase.exec();

    const validarCodigo = new ValidarCodigo(registrarUsuario.usuario.id, useCase.usuario.codigo);
    const resultValidarCodigo = await validarCodigo.exec();

    console.log(resultValidarCodigo);

    await UsuariosRepository.eliminar(useCase.usuario.id);
  });
});
