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

Cypress.Commands.add('getToken', (_url, user, password) => {
    cy.request({
      method: 'POST',
      url: `${_url}`,
      headers: { 'content-type': 'application/json' },
      body: {
        email: user,
        senha: password
      },
      failOnStatusCode: false
    }).its('body.token').should('not.be.empty')
    .then(token =>{
      return token
    })
})  
  })