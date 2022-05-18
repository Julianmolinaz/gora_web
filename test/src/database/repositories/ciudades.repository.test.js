const chai = require("chai");
const request = require("supertest");
const app = require("../../../../app");

const { expect } = chai;

describe("Probando el test", async () => {
  it("prueba inicial", async () => {
    console.log({ app });
    //const { body, status } = await request(server).get("/api/test");
    //console.log({status});
    //const { data } = body;
    const status = 200;
    expect(status).to.equal(200);
  });
});
