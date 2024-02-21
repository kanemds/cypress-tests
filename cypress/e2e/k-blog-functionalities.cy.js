describe('Funcionalities test', () => {
  beforeEach(() => {
    cy.viewport(1400, 750)

  })

  let username = 'bbbb'
  let email = `${username}@gmail.com`
  let password = 'aaaaaaa1'
  let confirm = password


  it('Test register form', () => {
    cy.visit('/register')
    cy.contains(/create account/i)
    cy.getDataTest('register-submit').click()
    cy.contains(/All fields are required/i)
    cy.getDataTest('register-input-username').type(username)
    cy.getDataTest('register-input-email').type(email)
    cy.getDataTest('register-input-password').type(password)
    cy.getDataTest('register-input-confirm').type(confirm)
    cy.getDataTest('register-submit').click()
  })

  it('Test user login', () => {
    cy.visit('/login')
    cy.getDataTest('login-form-username').type(username)
    cy.getDataTest('login-form-password').type(password)
    cy.getDataTest('login-form-submit').click()
    cy.url().should('include', '/').then(() => {
      cy.location('pathname').should('equal', '/')
    })
  })

  it('Search blog on main page', () => {
    cy.visit('/')
    cy.getDataTest('search-blog-button-clear').should('not.exist')
    cy.getDataTest('search-bar-main-page').type('abcd')
    cy.getDataTest('search-blog-button-active').click()
    cy.contains(/No Blogs for the selected date are available at the moment/i)
    cy.getDataTest('search-blog-button-clear').should('exist')
    cy.getDataTest('search-blog-button-clear').click()
    cy.getDataTest('search-blog-button-clear').should('not.exist')
    cy.getDataTest('search-bar-main-page').type('year')
    cy.getDataTest('search-blog-button-active').click()
    cy.getDataTest('search-blog-button-clear').click()
  })

  it('MY post page', () => {
    cy.visit('/blogs')

  })




})