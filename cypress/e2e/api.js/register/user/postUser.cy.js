/// <reference types="cypress" />

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

describe("Register Users", () => {

    it('Register user faker sucess', () => {
        cy.postUser('/usuarios',
            userFaker.BODY.nome,
            userFaker.BODY.email,
            userFaker.BODY.password,
            userFaker.BODY.administrador
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
                expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            });
    });

    it('Register user name empty', () => {
        cy.postUser('/usuarios',
            '',
            userFaker.BODY.email,
            userFaker.BODY.password,
            userFaker.BODY.administrador
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.nome).to.eq('nome não pode ficar em branco');
            });
    });

    it('Register user email empty', () => {
        cy.postUser('/usuarios',
            userFaker.BODY.nome,
            '',
            userFaker.BODY.password,
            userFaker.BODY.administrador
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.email).to.eq('email não pode ficar em branco');
            });
    });

    it('Register user email invalid', () => {
        cy.postUser('/usuarios',
            userFaker.BODY.nome,
            userFaker.BODY.nome,
            userFaker.BODY.password,
            userFaker.BODY.administrador
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.email).to.eq('email deve ser um email válido');
            });
    });

    it('Register user password empty', () => {
        cy.postUser('/usuarios',
            userFaker.BODY.nome,
            userFaker.BODY.email,
            '',
            userFaker.BODY.administrador
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.password).to.eq('password não pode ficar em branco');
            });
    });

    it('Register user administrator empty', () => {
        cy.postUser('/usuarios',
            userFaker.BODY.nome,
            userFaker.BODY.email,
            userFaker.BODY.password,
            ''
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'");
            });
    });

    it('Register user with two empty fields', () => {
        cy.postUser('/usuarios',
            '',
            '',
            userFaker.BODY.password,
            userFaker.BODY.administrador
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.nome).to.eq('nome não pode ficar em branco');
                expect(response.body.email).to.eq('email não pode ficar em branco');
            });
    });

    it('register user with all fields empty', () => {
        cy.postUser('/usuarios',
            '',
            '',
            '',
            ''
        )
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.nome).to.eq('nome não pode ficar em branco');
                expect(response.body.email).to.eq('email não pode ficar em branco');
                expect(response.body.password).to.eq('password não pode ficar em branco');
                expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'");
            });
    });
})