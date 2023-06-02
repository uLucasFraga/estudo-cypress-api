/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import dataUsers from "../../../fixtures/user.json";
const httpStatus = require("http-status-codes");

const userFaker = {
  BODY: {
    nome: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: faker.datatype.boolean().toString(),
  },
};

describe("Put Users", () => {
  let _id;

  before(() => {
    cy.registerUser(
      userFaker.BODY.nome,
      userFaker.BODY.email,
      userFaker.BODY.password
    ).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.CREATED);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      _id = response.body._id;
    });
  });

  it("Change User successfully", () => {
    cy.editUser(
      _id,
      userFaker.BODY.nome,
      userFaker.BODY.email,
      userFaker.BODY.password
    ).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.message).to.eq("Registro alterado com sucesso");
    });
  });

  it("Existing email", () => {
    cy.editUser(
      _id,
      userFaker.BODY.nome,
      dataUsers.email,
      userFaker.BODY.password
    ).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
      expect(response.body.message).to.eq("Este email já está sendo usado");
    });
  });
});
