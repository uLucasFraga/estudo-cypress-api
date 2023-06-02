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

describe("Delete Users", () => {
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

  it("Delete User successfully", () => {
    cy.deleteUser(_id).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.message).to.eq("Registro excluído com sucesso");
    });
  });

  it("Delete non-existent user", () => {
    cy.deleteUser(_id).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(response.body.message).to.eq("Nenhum registro excluído");
    });
  });

  it("Delete user with registered cart", () => {
    cy.deleteUser(dataUsers.idUsuario).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
      expect(response.body.message).to.eq(
        "Não é permitido excluir usuário com carrinho cadastrado"
      );
    });
  });
});
