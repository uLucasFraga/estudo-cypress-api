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

describe("Get Users", () => {
  let qtd;

  it("Listing Registered Users", () => {
    cy.searchUser().then((response) => {
      qtd = response.body.quantidade;
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.quantidade).to.eq(qtd);
    });
  });

  it("Listing Registered Users for name", () => {
    cy.searchUser(dataUsers.nome).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.usuarios[0].nome).to.eq(dataUsers.nome);
    });
  });

  it("Listing Registered Users for email", () => {
    cy.searchUser(dataUsers.email).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.usuarios[0].email).to.eq(dataUsers.email);
    });
  });

  it("Listing Registered Users for id", () => {
    cy.searchUser(dataUsers._id).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.usuarios[0]._id).to.eq(dataUsers._id);
    });
  });

  it("Listing Registered Users for password", () => {
    cy.searchUser(dataUsers.password).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.usuarios[0].password).to.eq(dataUsers.password);
    });
  });

  it("Listing Registered Users by two parameters", () => {
    cy.searchUser(dataUsers.nome, dataUsers.email).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.usuarios[0].nome).to.eq(dataUsers.nome);
      expect(response.body.usuarios[0].email).to.eq(dataUsers.email);
    });
  });

  it("Listing Registered Users by all parameters", () => {
    cy.searchUser(
      dataUsers.nome,
      dataUsers.email,
      dataUsers.password,
      dataUsers._id
    ).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.usuarios[0].nome).to.eq(dataUsers.nome);
      expect(response.body.usuarios[0].email).to.eq(dataUsers.email);
      expect(response.body.usuarios[0].password).to.eq(dataUsers.password);
      expect(response.body.usuarios[0]._id).to.eq(dataUsers._id);
    });
  });

  it("Listing non-existent users", () => {
    cy.searchUser(userFaker.BODY.nome).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.usuarios.nome).to.eq(undefined);
      expect(response.body.usuarios.nome).to.not.eq(userFaker.BODY.nome);
    });
  });

  it("Listing users with a valid parameter and an invalid parameter", () => {
    cy.searchUser(userFaker.BODY.nome, dataUsers._id).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.usuarios.nome).to.eq(undefined);
      expect(response.body.usuarios._id).to.eq(undefined);
    });
  });
});
