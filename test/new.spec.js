const { expect } = require("chai");
const api = require("supertest")(require("./../app"));
const MunicipiosRepository = require("./../src/database/repositories/municipios.repository");

describe("Demo test", () => {
  it("Listar municipios", async () => {
    const municipios = await MunicipiosRepository.getAll();
    expect(municipios.length).to.equal(1120);
  });
});
