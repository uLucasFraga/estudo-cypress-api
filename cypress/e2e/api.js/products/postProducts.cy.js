/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
const httpStatus = require("http-status-codes");

const productFaker = {
  BODY: {
    nome: faker.commerce.productName(),
    preco: faker.commerce.price(),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.datatype.number(100, 1),
  },
};

describe("Register Products without token", () => {
  it("Register product faker without authorization", () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    ).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED);
      expect(response.body.message).to.eq(
        "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
      );
    });
  });
});

describe("Register Products with token", () => {
  beforeEach(() => {
    cy.getToken();
  });

  it("Register product faker sucess", () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    ).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.CREATED);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
    });
  });
});
