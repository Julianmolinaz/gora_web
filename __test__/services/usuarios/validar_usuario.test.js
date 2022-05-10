const ValidarUsuario = require("./../../../src/services/usuarios/validar_usuario");

test("validacion datos de usuario", async () => {
  const useCase = new ValidarUsuario({});
  await useCase.exec();
  if (useCase.fails()) {
    console.log(useCase.errors);
  }
});
