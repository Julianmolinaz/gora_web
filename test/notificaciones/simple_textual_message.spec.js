const { expect } = require("chai");
const { app } = require("./../../app"); 

const { sendSms } = require("./../../src/services/notificaciones/simple_textual_message.js");

describe("Terminos", () => {
  it("Enviar mensaje de text", async () => {
    await sendSms("test", ["573207809668"], "lorem ipsum dolor");
  });
});
