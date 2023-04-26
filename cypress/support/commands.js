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
// Cypress.Commands.add('getToken', (_url, user, password) => {
//     cy.request({
//       method: 'POST',
//       url: `${_url}`,
//       headers: { 'content-type': 'application/json' },
//       body: {
//         email: user,
//         senha: password
//       },
//       failOnStatusCode: false
//         }).its('body.token').should('not.be.empty')
//         .then(token =>{
//           return token
//       })
//   })
  // Cypress.Commands.add('getIDUser', (_url, nome, email, password, administrador) =>{
  //   cy.request({
  //     method: 'POST',
  //     url: `${url}`,
  //     headers: { 'content-type': 'application/json' },
  //     body: {
  //       nome: nome,
  //       email: email,
  //       password: password,
  //       administrador: administrador
  //     },
  //     failOnStatusCode: false
  //   }).its('body.IDUser').should('not.be.empty')
  //     .then(IDUser =>{
  //       return IDUser
  //     })
  // })

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