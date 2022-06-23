const { expect } = require("chai");
const { app } = require("./../../app"); 

const GenerarCodigoUsuarioNuevo = require("./../../src/services/usuarios/generar_codigo_usuario_nuevo"); 
const usuario = require("./../_mocks/usuario.mock.js");

describe("Aceptar términos", () => {
  it("Error datos vacios", async () => {
    try {
      const useCase = new GenerarCodigoUsuarioNuevo({});
      await useCase.exec();
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it("Datos correctos", async () => {
    const dataUsuario = JSON.parse(JSON.stringify(usuario));
    const useCase = new GenerarCodigoUsuarioNuevo(dataUsuario);
    await useCase.exec();
  });
});
