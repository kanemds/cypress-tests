describe('create user and login test', () => {

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
  })

})

