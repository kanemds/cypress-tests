import singlePostFromOtherUser from "../data-test/k-blog/singlePostFromOtherUser"

function clickUntilTimestampVisible() {

  cy.get('[data-timestamp="1704096000000"]').then(($element) => {
    if ($element.length > 0) {
      $element.trigger("click")
      cy.wait(1000)
    } else {

      cy.wait(1000)
      clickUntilTimestampVisible()
    }
  })
}


describe('login user with crud(subscribe, like and bookmark) and finally logout', () => {

  const blogId = '65939ad0e92827fd946c9af4'
  const image = '/home/kanem/project/cypress/cypress/data-test/k-blog/images/sky.jpg'

  beforeEach(() => {
    cy.fixture('k-blog-user').then(data => {
      cy.loginWithJwtToken(data.username, data.password)
    })
  })

  it('Search blog on main page', () => {
    cy.get('.MuiIconButton-edgeEnd').scrollIntoView({ duration: 1000 })
    cy.get('[data-timestamp="1704096000000"]').should('not.exist')
    cy.get('.MuiIconButton-edgeEnd').click()
    cy.wait(1000)
    clickUntilTimestampVisible()
    cy.get(':nth-child(2) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click()
    cy.wait(1000)
    cy.getDataTest('search-blog-button-clear').should('not.exist')
    cy.getDataTest('search-bar-main-page').type('abcd')
    cy.getDataTest('search-blog-button-active').click()
    cy.contains(/No Blogs for the selected date are available at the moment/i)
    cy.wait(1000)
    cy.getDataTest('search-blog-button-clear').should('exist')
    cy.getDataTest('search-blog-button-clear').click()
    cy.wait(1000)
    cy.getDataTest('search-blog-button-clear').should('not.exist')
    cy.wait(1000)
    cy.getDataTest('search-bar-main-page').type('year')
    cy.getDataTest('search-blog-button-active').click()
    cy.wait(1000)
    cy.getDataTest(blogId).should('exist').click()
    cy.wait(1000)
    cy.getDataTest(singlePostFromOtherUser.avtarButton).should('exist')
    cy.getDataTest(singlePostFromOtherUser.subscribeButton).should('exist')
    cy.getDataTest(singlePostFromOtherUser.bookmarkButton).should('exist')
    cy.getDataTest(singlePostFromOtherUser.likeButton).should('exist')
    cy.wait(1000)
    cy.getDataTest(singlePostFromOtherUser.subscribeButton).click()
    cy.wait(1000)
    cy.getDataTest(singlePostFromOtherUser.bookmarkButton).click()
    cy.wait(1000)
    cy.getDataTest(singlePostFromOtherUser.likeButton).click()
    cy.wait(1000)
    cy.getDataTest(singlePostFromOtherUser.avtarButton).click()
    cy.visit('/blogs/subscribed')
    cy.wait(1000)
    cy.getDataTest('subscribed-page-blog-button').click()
    cy.wait(1000)
    cy.getDataTest('subscribed-page-blog-button-delete').click()
    cy.wait(3000)
    cy.visit('/blogs/bookmarks')
    cy.wait(1000)
    cy.getDataTest(`bookmark-blog-${blogId}`).should('exist').click()
    cy.wait(1000)
    cy.getDataTest('bookmark-page-button-delete').click()
    cy.wait(3000)
    cy.visit('/blogs/liked')
    cy.wait(1000)
    cy.getDataTest(`liked-blog-${blogId}`).should('exist').click()
    cy.wait(1000)
    cy.getDataTest('liked-page-button-delete').click()
    cy.wait(3000)
    cy.visit('/blogs')
    cy.getDataTest('user-post-list').should('not.exist')
    cy.getDataTest('user-post-container').within(() => {
      cy.get('div').contains(/No Blogs are created on the current section/i)
    })
    cy.wait(1000)
    cy.visit('/blogs/new')
    cy.wait(1000)
    cy.get("input[type='file']").should('exist')
    cy.get("input[type='file']").scrollIntoView()
    cy.get("input[type='file']").selectFile(image, { force: true })
    cy.getDataTest('create-post-title').type('write a title in cypress command')
    cy.getDataTest('create-post-body-text').type('create a body text in cypress command')
    cy.getDataTest('create-post-submit-button').click()
    cy.getDataTest('user-post-list').should('exist')
    cy.wait(1000)
    cy.getDataTest('pop-over-button').trigger('mouseover').click()
    cy.getDataTest('delete-blog').click()
    cy.wait(1000)
    cy.getDataTest('comfirm-delete-blog-button').click()
    cy.wait(3000)
    cy.getDataTest('user-post-list').should('not.exist')
    cy.getDataTest('navbar-avatar').click()
    cy.getDataTest('navbar-avatar-logout').click()
  })

  // it('check post list when is empty', () => {
  //   cy.visit('/blogs')
  //   cy.getDataTest('user-post-list').should('not.exist')
  //   cy.getDataTest('user-post-container').within(() => {
  //     cy.get('div').contains(/No Blogs are created on the current section/i)
  //   })
  // })

  // it('create a post', () => {
  //   cy.visit('/blogs/new')
  //   cy.get("input[type='file']").should('exist')
  //   cy.get("input[type='file']").scrollIntoView()
  //   cy.get("input[type='file']").selectFile(image, { force: true })
  //   cy.getDataTest('create-post-title').type('write a title in cypress command')
  //   cy.getDataTest('create-post-body-text').type('create a body text in cypress commnad')
  //   cy.getDataTest('create-post-submit-button').click()
  //   cy.getDataTest('user-post-list').should('exist')
  // })

  // it('delete a post', () => {
  //   cy.visit('/blogs')
  //   cy.getDataTest('user-post-list').should('exist')
  //   cy.getDataTest('pop-over-button').trigger('mouseover').click()
  //   cy.getDataTest('delete-blog').click()
  //   cy.getDataTest('comfirm-delete-blog-button').click()
  //   cy.wait(3000)
  //   cy.getDataTest('user-post-list').should('not.exist')
  // })

  // it('calendar', () => {
  //   cy.get('.MuiIconButton-edgeEnd').scrollIntoView({ duration: 2000 })
  //   cy.wait(1000)
  //   cy.get('[data-timestamp="1704096000000"]').should('not.exist')

  //   // Initially click on '.MuiIconButton-edgeEnd'
  //   cy.get('.MuiIconButton-edgeEnd').click()
  //   clickUntilTimestampVisible()
  //   cy.get(':nth-child(2) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click()
  // })
})






