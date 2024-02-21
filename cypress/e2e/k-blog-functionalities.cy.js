import singlePostFromOtherUser from "../data-test/k-blog/singlePostFromOtherUser"

describe('Funcionalities test', () => {



  const blogId = '65939ad0e92827fd946c9af4'

  beforeEach(() => {
    cy.fixture('k-blog-user').then(data => {
      cy.loginWithJwtToken(data.username, data.password)
    })
    cy.viewport(1400, 800)
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
    cy.getDataTest(blogId).should('exist').click()
    cy.getDataTest(singlePostFromOtherUser.avtarButton).should('exist')
    cy.getDataTest(singlePostFromOtherUser.subscribeButton).should('exist')
    cy.getDataTest(singlePostFromOtherUser.bookmarkButton).should('exist')
    cy.getDataTest(singlePostFromOtherUser.likeButton).should('exist')

    cy.getDataTest(singlePostFromOtherUser.subscribeButton).click()
    cy.getDataTest(singlePostFromOtherUser.bookmarkButton).click()
    cy.getDataTest(singlePostFromOtherUser.likeButton).click()
    cy.wait(3000)
    cy.getDataTest(singlePostFromOtherUser.avtarButton).click()
    // cy.getDataTest(singlePostFromOtherUser.subscribeButton).click()
  })




})