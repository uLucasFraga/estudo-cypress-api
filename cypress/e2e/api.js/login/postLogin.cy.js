/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import dataUsers from "../../../fixtures/user.json";
const httpStatus = require("http-status-codes");

const userFaker = {
  BODY: {
    nome: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
};

describe("Login", () => {
  it("Login successfully", () => {
    cy.login(dataUsers.email, dataUsers.password).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.message).to.eq("Login realizado com sucesso");
    });
  });

  it("Login email empty", () => {
    cy.login("", dataUsers.password).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
      expect(response.body.email).to.eq("email não pode ficar em branco");
    });
  });

  it("Login password empty", () => {
    cy.login(dataUsers.email, "").then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
      expect(response.body.password).to.eq("password não pode ficar em branco");
    });
  });

  it("Login email and password empty", () => {
    cy.login("", "").then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
      expect(response.body.email).to.eq("email não pode ficar em branco");
      expect(response.body.password).to.eq("password não pode ficar em branco");
    });
  });

  it("Login with non-existent email", () => {
    cy.login(userFaker.BODY.email, dataUsers.password).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED);
      expect(response.body.message).to.eq("Email e/ou senha inválidos");
    });
  });

  it("Login with non-existent password", () => {
    cy.login(dataUsers.email, userFaker.BODY.password).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED);
      expect(response.body.message).to.eq("Email e/ou senha inválidos");
    });
  });

  it("Login with invalid email", () => {
    cy.login(dataUsers.nome, dataUsers.password).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
      expect(response.body.email).to.eq("email deve ser um email válido");
    });
  });
});
