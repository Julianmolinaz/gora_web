const RegistrarUsuario = require("./../../../src/services/usuarios/registrar_usuario");

test("registrar usuario", async () => {
  const registrar = new RegistrarUsuario({});
  await registrar.exec();
});
