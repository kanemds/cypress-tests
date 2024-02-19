describe('template spec', () => {
  it('contain correct navbar hearder text', () => {
    cy.visit('/')
    cy.get("[data-test='k-blog-header']").contains(/K-BLOG/i)
    cy.get("[data-test='k-blog-header']").should('contain.text', 'K-BLOG')
    cy.get("[data-test='k-blog-header']").should($div => {
      console.log($div.text())
      let text = $div.text().toUpperCase()
      let expectedText = 'k-blog'.toUpperCase()
      console.log(expectedText)
      expect(text).to.equal(expectedText)
    })
  })
})