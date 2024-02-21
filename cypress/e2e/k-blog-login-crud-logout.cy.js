import singlePostFromOtherUser from "../data-test/k-blog/singlePostFromOtherUser"


describe('login user with crud(subscribe, like and bookmark) and finally logout', () => {

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
    cy.visit('/blogs/subscribed')
    cy.getDataTest('subscribed-page-blog-button').click()
    cy.getDataTest('subscribed-page-blog-button-delete').click()
    cy.wait(5000)
    cy.visit('/blogs/bookmarks')
    cy.getDataTest(`bookmark-blog-${blogId}`).should('exist').click()
    cy.getDataTest('bookmark-page-button-delete').click()
    cy.wait(5000)
    cy.visit('/blogs/liked')
    cy.getDataTest(`liked-blog-${blogId}`).should('exist').click()
    cy.getDataTest('liked-page-button-delete').click()
    cy.wait(5000)
    cy.visit('/')
    cy.getDataTest('navbar-avatar').click()
    cy.getDataTest('navbar-avatar-logout').click()
  })

  it('check post list when is empty', () => {
    cy.visit('/blogs')
    cy.getDataTest('user-post-list').should('not.exist')
    cy.getDataTest('user-post-container').within(() => {
      cy.get('div').contains(/No Blogs are created on the current section/i)
    })
  })

  it('create a post', () => {
    const image = '/home/kanem/project/cypress/cypress/data-test/k-blog/images/sky.jpg'

    cy.visit('/blogs/new')
    cy.get("input[type='file']").should('exist')
    cy.get("input[type='file']").scrollIntoView()
    cy.get("input[type='file']").selectFile(image, { force: true })
    cy.getDataTest('create-post-title').type('write a title in cypress command')
    cy.getDataTest('create-post-body-text').type('create a body text in cypress commnad')
    cy.getDataTest('create-post-submit-button').click()
    cy.getDataTest('user-post-list').should('exist')
    cy.getDataTest('user-post-list').within(() => {
      cy.get('div').should('have.length', 1)
    })
  })

  it.only('delete a post', () => {
    cy.visit('/blogs')
    cy.getDataTest('user-post-list').should('exist')
    cy.getDataTest('pop-over-button').click()
    // cy.getDataTest('delete-blog').click()


  })
})






