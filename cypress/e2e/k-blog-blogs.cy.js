describe('test login user on blogs page', () => {
  beforeEach(() => {
    const username = 'cate'
    const password = 'aaaaaaa1'
    cy.loginWithJwtToken(username, password)

  })

  it('login', () => {
    cy.getDataTest('k-blog-header').click()
    cy.getDataTest('6593a861fa0e54c00b0aa583').should('exist')
    cy.visit('/blogs')

    cy.visit('/blogs/liked')

    cy.visit('/blogs/bookmarks')
  })


})