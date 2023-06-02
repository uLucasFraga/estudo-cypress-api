/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
const httpStatus = require("http-status-codes");

const userFaker = {
  BODY: {
    nome: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: faker.datatype.boolean().toString(),
  },
};

describe("Register Users", () => {
  it("Register user faker sucess", () => {
    cy.registerUser(
      userFaker.BODY.nome,
      userFaker.BODY.email,
      userFaker.BODY.password
    ).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.CREATED);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
    });
  });

  it("Register user name empty", () => {
    cy.registerUser("", userFaker.BODY.email, userFaker.BODY.password).then(
      (response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
        expect(response.body.nome).to.eq("nome não pode ficar em branco");
      }
    );
  });

  it("Register user email empty", () => {
    cy.registerUser(userFaker.BODY.nome, "", userFaker.BODY.password).then(
      (response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
        expect(response.body.email).to.eq("email não pode ficar em branco");
      }
    );
  });

  it("Register user email invalid", () => {
    cy.registerUser(
      userFaker.BODY.nome,
      userFaker.BODY.nome,
      userFaker.BODY.password
    ).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
      expect(response.body.email).to.eq("email deve ser um email válido");
    });
  });

  it("Register user password empty", () => {
    cy.registerUser(userFaker.BODY.nome, userFaker.BODY.email, "").then(
      (response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
        expect(response.body.password).to.eq(
          "password não pode ficar em branco"
        );
      }
    );
  });

  it("Register user with two empty fields", () => {
    cy.registerUser("", "", userFaker.BODY.password).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
      expect(response.body.nome).to.eq("nome não pode ficar em branco");
      expect(response.body.email).to.eq("email não pode ficar em branco");
    });
  });

  it("register user with all fields empty", () => {
    cy.registerUser("", "", "").then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
      expect(response.body.nome).to.eq("nome não pode ficar em branco");
      expect(response.body.email).to.eq("email não pode ficar em branco");
      expect(response.body.password).to.eq("password não pode ficar em branco");
    });
  });
});
