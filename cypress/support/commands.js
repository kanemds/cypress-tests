// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getDataTest', (dataTestSelector) => {
  return cy.get(`[data-test=${dataTestSelector}]`)
})



Cypress.Commands.add('loginWithJwtToken', (name, password) => {
  cy.visit('/login')
  cy.getDataTest('persist-login').click()
  cy.getDataTest('login-form-username').type(name)
  cy.getDataTest('login-form-password').type(password)
  cy.getDataTest('login-form-submit').click()
  // cy.url().should('include', '/').then(() => {
  //   cy.location('pathname').should('equal', '/')
  // })
  cy.wait(2000)
})