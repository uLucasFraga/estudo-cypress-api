/// <reference types="cypress" />

import dataUsers from '../../../../fixtures/user.json'
import { faker } from '@faker-js/faker';

const userFaker = {
    BODY: {
        nome: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: faker.datatype.boolean().toString()
    }
}

const httpStatus = require('http-status-codes')

describe('Put Users', () => {
    let _id
  
    before(() => {
        cy.postUser('/usuarios',
            userFaker.BODY.nome,
            userFaker.BODY.email,
            userFaker.BODY.password,
            userFaker.BODY.administrador
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
                expect(response.body.message).to.eq('Cadastro realizado com sucesso');
                _id = response.body._id
            });
    
        });

    it('Change User successfully', () =>{
        cy.putUser(_id,
        userFaker.BODY.nome,
        userFaker.BODY.email,
        userFaker.BODY.password,
        userFaker.BODY.administrador
        )
            .then((response) =>{
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.message).to.eq('Registro alterado com sucesso')
            })
    });

    it('Existing email', () =>{
        cy.putUser(_id,
        userFaker.BODY.nome,
        dataUsers.email,
        userFaker.BODY.password,
        userFaker.BODY.administrador
        )
            .then((response) =>{
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.message).to.eq('Este email já está sendo usado')
            })
    });

    
})