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