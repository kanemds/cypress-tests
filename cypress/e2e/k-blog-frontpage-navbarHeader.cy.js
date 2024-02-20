describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('contain correct navbar hearder text', () => {
    cy.viewport(1300, 750)
    cy.getDataTest('k-blog-header').contains(/K-BLOG/i)
    cy.getDataTest('k-blog-header').should('contain.text', 'K-BLOG')
    cy.getDataTest('k-blog-header').should(div => {
      console.log(div.text())
      let text = div.text().toLowerCase()
      let expectedText = 'k-blog'
      console.log(expectedText)
      expect(text).to.equal(expectedText)
    })
  })
})