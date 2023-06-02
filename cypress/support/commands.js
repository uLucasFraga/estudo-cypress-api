const httpStatus = require("http-status-codes");

// >>>>>> LOGIN <<<<<<

Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: "/login",
    headers: { "content-type": "application/json" },
    body: {
      email: email,
      password: password,
    },
    failOnStatusCode: false,
  });
});

// >>>>>> GET TOKEN <<<<<<

Cypress.Commands.add(
  "getToken",
  (email = Cypress.env("EMAIL"), pass = Cypress.env("PASSWORD")) => {
    cy.login(email, pass).then((response) => {
      localStorage.setItem("token", response.body.authorization);
      expect(response.status).to.eq(httpStatus.StatusCodes.OK);
      expect(localStorage.getItem("token")).not.null;
      cy.log(localStorage.getItem("token"));
    });
  }
);

// >>>>>> USER <<<<<<

Cypress.Commands.add("registerUser", (nome, email, password) => {
  cy.request({
    method: "POST",
    url: "/usuarios",
    headers: { "content-type": "application/json" },
    body: {
      nome: nome,
      email: email,
      password: password,
      administrador: "true",
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("searchUser", (nome, email, _id) => {
  const params = Cypress._.pick({ nome, email, _id }, Cypress._.identity);

  cy.request({
    method: "GET",
    url: "/usuarios",
    headers: { "content-type": "application/json" },
    qs: params,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("deleteUser", (_id) => {
  cy.request({
    method: "DELETE",
    url: `/usuarios/${_id}`,
    headers: { "content-type": "application/json" },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("editUser", (_id, nome, email, password) => {
  cy.request({
    method: "PUT",
    url: `/usuarios/${_id}`,
    headers: { "content-type": "application/json" },
    body: {
      nome: nome,
      email: email,
      password: password,
      administrador: "true",
    },
    failOnStatusCode: false,
  });
});

// >>>>>> PRODUCTS <<<<<<

Cypress.Commands.add(
  "searchProducts",
  (nome, preco, descricao, quantidade, _id) => {
    const params = Cypress._.pick(
      { nome, preco, descricao, quantidade, _id },
      Cypress._.identity
    );

    cy.request({
      method: "GET",
      url: "/produtos",
      headers: { "content-type": "application/json" },
      qs: params,
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add("registerProduct", (name, price, description, qtd) => {
  cy.request({
    method: "POST",
    url: "/produtos",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    failOnStatusCode: false,
    body: {
      nome: name,
      preco: price,
      descricao: description,
      quantidade: qtd,
    },
  });
});
