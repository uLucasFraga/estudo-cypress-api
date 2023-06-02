/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import dataProducts from '../../../../fixtures/product.json'

const productFaker = {
    BODY: {
        nome: faker.commerce.productName,
        preco: faker.commerce.price,
        descricao: faker.commerce.productDescription,
        quantidade: faker.datatype.number,
        _id: faker.datatype.array
    }    
}

const httpStatus = require('http-status-codes')

describe ("Get Products", () =>{

    let qtd

    it('Listing Registered Products', () => {
        cy.getProducts('/produtos')
          .then((response) => {
            qtd = response.body.quantidade
            expect(response.status).to.eq(httpStatus.StatusCodes.OK)
            expect(response.body.quantidade).to.eq(qtd)
          });
      });
    
      it('Listing Registered Products for name', () => {
        cy.getProducts(
          dataProducts.nome
          )
          .then((response) => {
            expect(response.status).to.eq(httpStatus.StatusCodes.OK)
            expect(response.body.produtos[0].nome).to.eq(dataProducts.produtos[0].nome)
          });
      });

      it('Listing Registered Products for price', () => {
        cy.getProducts(
          dataProducts.preco
          )
          .then((response) => {
            expect(response.status).to.eq(httpStatus.StatusCodes.OK)
            expect(response.body.produtos[0].preco).to.eq(dataProducts.produtos[0].preco)
          });
      });

      it('Listing Registered Products for descripcion', () => {
        cy.getProducts(
          dataProducts.descricao
          )
          .then((response) => {
            expect(response.status).to.eq(httpStatus.StatusCodes.OK)
            expect(response.body.produtos[0].descricao).to.eq(dataProducts.produtos[0].descricao)
          });
      });

      it('Listing Registered Products for _id', () => {
        cy.getProducts(
          dataProducts._id
          )
          .then((response) => {
            expect(response.status).to.eq(httpStatus.StatusCodes.OK)
            expect(response.body.produtos[0]._id).to.eq(dataProducts.produtos[0]._id)
          });
      });

      it('Listing Registered Products by two parameters', () => {
        cy.getProducts(
          dataProducts.nome,
          dataProducts._id
          )
          .then((response) => {
            expect(response.status).to.eq(httpStatus.StatusCodes.OK)
            expect(response.body.produtos[0].nome).to.eq(dataProducts.produtos[0].nome)
            expect(response.body.produtos[0]._id).to.eq(dataProducts.produtos[0]._id)
          });
      });

      it('Listing Registered Products by all parameters', () => {
        cy.getProducts(
          dataProducts.nome,
          dataProducts.preco,
          dataProducts.descricao,
          dataProducts.quantidade,
          dataProducts._id
          )
          .then((response) => {
            expect(response.status).to.eq(httpStatus.StatusCodes.OK)
            expect(response.body.produtos[0].nome).to.eq(dataProducts.produtos[0].nome)
            expect(response.body.produtos[0].preco).to.eq(dataProducts.produtos[0].preco)
            expect(response.body.produtos[0].descricao).to.eq(dataProducts.produtos[0].descricao)
            expect(response.body.produtos[0].quantidade).to.eq(dataProducts.produtos[0].quantidade)
            expect(response.body.produtos[0]._id).to.eq(dataProducts.produtos[0]._id)
          });
      }); 
      
      it('Listing non-existent Products', () => {
        cy.getProducts(
          productFaker.BODY.nome
          )
          .then((response) => {
            expect(response.status).to.eq(httpStatus.StatusCodes.OK)
            expect(response.body.produtos[0].nome).to.not.eq(productFaker.BODY.nome)
          });
      });

      it('Listing Products with a valid parameter and an invalid parameter', () => {
        cy.getProducts(
          productFaker.BODY.nome,
          dataProducts._id
          )
          .then((response) => {
            expect(response.status).to.eq(httpStatus.StatusCodes.OK)
            expect(response.body.produtos[0].nome).to.not.eq(productFaker.BODY.nome)
            expect(response.body.produtos[0]._id).to.eq(dataProducts.produtos[0]._id)
          });
      });
})