/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import dataUsers from '../../../../fixtures/user.json'
import dataProducts from '../../../../fixtures/product.json'

const productFaker = {
    BODY: {
        nome: faker.commerce.productName(),
        preco: faker.commerce.price(),
        descricao: faker.commerce.productDescription(),
        quantidade: faker.datatype.number(),
        _id: faker.datatype.array()
    }    
}

const httpStatus = require('http-status-codes')

describe("Register Products without token", () => {

    it('Register product faker without authorization', () => {
        cy.postProducts(
            productFaker.BODY.nome,
            productFaker.BODY.preco,
            productFaker.BODY.descricao,
            productFaker.BODY.quantidade
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
                expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
            });
    });
})

describe("Register Products with token", () => {
    let token
    // beforeEach(() =>{
        it('Register product faker sucess', () => {
        cy.loginUser('/login',
            dataUsers.email,
            dataUsers.password).its('body.authorization').should('not.be.empty')
            .then(token => {
                cy.request({
                    method: 'POST',
                    url: '/produtos',
                    headers: { 
                      'content-type': 'application/json',
                      Authorization: `${token}`
                    },
                    body: {
                      nome: productFaker.BODY.nome,
                      preco: productFaker.BODY.preco,
                      descricao: productFaker.BODY.descricao,
                      quantidade: productFaker.BODY.quantidade
                    }
            }).then((response) => {
                                expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
                                expect(response.body.message).to.eq('Cadastro realizado com sucesso');
                            })
        })
    })
})
        //   .then((response) => {
        //     expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        //     expect(response.body.message).to.eq('Login realizado com sucesso')
        //     expect(response.body.authorization).to.exist
        //     const token = Cypress.env('token', response.body.authorization)

        //     cy.log(token)
        //   })
// })

// describe("Register Products with token", () => {
//     let token
//     beforeEach(() =>{
//         cy.loginUser('/login',
//             dataUsers.email,
//             dataUsers.password).its('body.authorization').should('not.be.empty')
//             .then((response) => {
//                     expect(response.status).to.eq(httpStatus.StatusCodes.OK)
//                     expect(response.body.message).to.eq('Login realizado com sucesso')
//                     expect(response.body.authorization).to.exist
//                     token = ('token', response.body.authorization)
        
//                     cy.log(token)
//                   })
//                 })


//     it('Register product faker sucess', () => {
        
//         cy.postProducts(
//             productFaker.BODY.nome,
//             productFaker.BODY.preco,
//             productFaker.BODY.descricao,
//             productFaker.BODY.quantidade,
//             token
//         )
//             .then((response) => {
//                 expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
//                 expect(response.body.message).to.eq('Cadastro realizado com sucesso');
//             })
//     })

// })
