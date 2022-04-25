/// <reference types="cypress" />

it('should login and redirect to instances page', () => {
  cy.visit('/')

  cy.get('input[type="text"]').type('test1@sample.com')
  cy.get('input[type="password"]').type('1234')

  cy.get('button[type="submit"]').click().url().should('include', 'instances')

  cy.get('table', { timeout: 500 }).should('exist')
})

it('should login and redirect to /login when logout button is cliced', () => {
  cy.visit('/')

  cy.get('input[type="text"]').type('test1@sample.com')
  cy.get('input[type="password"]').type('1234')

  cy.get('button[type="submit"]').click().url().should('include', 'instances')

  cy.get('[data-testid="AccountCircleIcon"]').click()
  cy.contains('Log out')
    .click()
    .url()
    .should('eq', Cypress.config().baseUrl + '/')
})
