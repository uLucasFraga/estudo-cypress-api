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

describe('Delete Users', () => {
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

  it('Delete User successfully', () => {
    cy.delUser(_id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro excluído com sucesso')
      })
  })

  it('Delete non-existent user', () => {
    cy.delUser(_id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Nenhum registro excluído')
      })
  })

 it('delete user with registered cart', () => {
    cy.delUser(dataUsers.idUsuario)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Não é permitido excluir usuário com carrinho cadastrado')
      })
  })
})