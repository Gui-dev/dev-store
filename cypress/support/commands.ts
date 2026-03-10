/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      searchByQuery(query: string): Chainable
    }
  }
}

Cypress.Commands.add('searchByQuery', (query: string) => {
  cy.get('input[name="query"]').type(query).parent('form').submit()
})

export {}
