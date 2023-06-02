const httpStatus = require('http-status-codes')

// >>>>>> LOGIN <<<<<<

Cypress.Commands.add('loginUser', (_url, email, password) =>{
  cy.request({
    method: 'POST',
    url: `${_url}`,
    headers: { 'content-type': 'application/json' },
    body: {
      email: email,
      password: password
    },
    failOnStatusCode: false
  })
})

// >>>>>> USER <<<<<<

Cypress.Commands.add('postUser', (_url, nome, email, password, administrador) => {
    cy.request({
      method: 'POST',
      url: `${_url}`,
      headers: { 'content-type': 'application/json' },
      body: {
        nome: nome,
        email: email,
        password: password,
        administrador: administrador
      },
      failOnStatusCode: false
    })
  })

Cypress.Commands.add('getUser', (nome, email, _id) => {
  const params = Cypress._.pick({ nome, email, _id }, Cypress._.identity);

    cy.request({
      method: 'GET',
      url: '/usuarios',
      headers: { 'content-type': 'application/json'},
      qs: params,
      failOnStatusCode: false
    })
  })

Cypress.Commands.add('delUser', (_id) => {
      cy.request({
        method: 'DELETE',
        url: `/usuarios/${_id}`,
        headers: { 'content-type': 'application/json' },
        failOnStatusCode: false
      })
    })    

Cypress.Commands.add('putUser', (_id, nome, email, password, administrador) =>{
      cy.request({
        method: 'PUT',
        url: `/usuarios/${_id}`,
        headers: { 'content-type': 'application/json'},
        body: {
          nome: nome,
          email: email,
          password: password,
          administrador: administrador
        },
        failOnStatusCode: false
      })
})

  // >>>>>> PRODUCTS <<<<<<

  Cypress.Commands.add('getProducts', ( nome, preco, descricao, quantidade, _id) =>{
    const params = Cypress._.pick({ nome, preco, descricao, quantidade, _id}, Cypress._.identity);

    cy.request({
      method: 'GET',
      url: '/produtos',
      headers: { 'content-type': 'application/json'},
      qs: params,
      failOnStatusCode: false
    })
  })

//   Cypress.Commands.add('getToken', (email = Cypress.env('email'), password = Cypress.env('password')) => {
//     cy.loginUser('/login',
//         email,
//         password)
//       .then((response) => {
//       expect(response.status).to.eq(httpStatus.StatusCodes.OK)
//       expect(response.body.message).to.eq('Login realizado com sucesso')
//       expect(response.body.authorization).to.exist
//       Cypress.env('token', response.body.authorization)
//     })
// })


  Cypress.Commands.add('postProducts', (nome, preco, descricao, quantidade, token) => {
    cy.request({
      method: 'POST',
      url: '/produtos',
      headers: { 
        'content-type': 'application/json',
        Authorization: `${token}`
      },
      body: {
        nome: nome,
        preco: preco,
        descricao: descricao,
        quantidade: quantidade
      },
      failOnStatusCode: false
    })
  }) 
  