const SendMensaje = require("./../../../src/services/contacto/send_mensaje");

it("mensajeria clientes", async () => {
  const mensaje = new SendMensaje({
    email: "etereosum@gmail.com",
    nombre: "Pablo Gonzalez",
    contenido: "Hola Gora",
  });
  const result = await mensaje.execute();
});
