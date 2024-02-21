describe('Store cookies after login', () => {

  let username = 'bbbb'
  let password = 'aaaaaaa1'


  it('login', () => {
    cy.visit('/login')
    cy.getDataTest('login-form-username').type(username)
    cy.getDataTest('login-form-password').type(password)
    cy.getDataTest('login-form-submit').click()
    cy.url().should('include', '/').then(() => {
      cy.location('pathname').should('equal', '/')
    })
    cy.getCookie('jwt').should('exist')
    cy.getCookie('jwt').then(cookie => {
      if (cookie) {
        cy.session([cookie.name, cookie.value], () => {
          console.log('cookie stored')
        }), { cacheAcrossSpecs: true }

      } else {
        throw new Error('JWT cookie not found')
      }
    })
  })


})