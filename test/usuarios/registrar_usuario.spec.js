const { expect } = require("chai");
const { app } = require("./../../app"); 

const ValidarUsuario = require("./../../src/services/usuarios/validar_usuario.js");
const RegistrarUsuario = require("./../../src/services/usuarios/registrar_usuario.js");
const { ValidationError } = require("./../../src/errors");
const UsuariosRepository = require("./../../src/database/repositories/usuarios.repository");

const usuario = require("./../_mocks/usuario.mock.js");

describe("Creacion de usuarios", () => {
  it("Validar usuario al crear", async () => {
    try {
      const validarUsuario = new ValidarUsuario({});
      validarUsuario.exec();
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it("Registrar usuario con datos vacios", async () => {
    try {
      const registrarUsuario = new RegistrarUsuario({});
      await registrarUsuario.exec();
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it("Registrar usuario con datos validos", async () => {
      const dataUsuario = JSON.parse(JSON.stringify(usuario)); 
      const registrarUsuario = new RegistrarUsuario(dataUsuario);
      await registrarUsuario.exec();
      await UsuariosRepository.eliminar(registrarUsuario.usuario.id);
  });
});
