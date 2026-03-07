describe('Add product to cart', () => {
  it('should add product to cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.get('button').contains('Adicionar ao carrinho').click()

    cy.contains('Carrinho (1)').should('exist')
  })

  it('should not add duplicate product to cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.get('button').contains('Adicionar ao carrinho').click()
    cy.get('button').contains('Adicionar ao carrinho').click()

    cy.contains('Carrinho (1)').should('exist')
  })

  it('should be able to search for a product and add to cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('input[name="query"]').type('moletom').parent('form').submit()

    cy.get('a[href^="/product"]').first().click()

    cy.get('button').contains('Adicionar ao carrinho').click()

    cy.contains('Carrinho (1)').should('exist')
  })
})

