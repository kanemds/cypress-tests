describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('contain correct navbar hearder text', () => {
    cy.viewport(1300, 750)
    cy.get("[data-test='k-blog-header']").contains(/K-BLOG/i)
    cy.get("[data-test='k-blog-header']").should('contain.text', 'K-BLOG')
    cy.get("[data-test='k-blog-header']").should(div => {
      console.log(div.text())
      let text = div.text().toLowerCase()
      let expectedText = 'k-blog'
      console.log(expectedText)
      expect(text).to.equal(expectedText)
    })
  })

  it('responsive sdiebar', () => {
    cy.viewport(550, 750)
    cy.window().then(win => {
      const windowWidth = win.innerWidth
      if (windowWidth < '791') {
        console.log('small')
      } else {
        console.log('not small')
      }
    })
    cy.get("[data-test='sidebar-homebutton']").contains(/home/i).should('not.be.visible')
    cy.get("[data-test='frontpage-DehazeIcon-sidebar-button-on']").click()
    cy.get("[data-test='sidebar-homebutton']").contains(/home/i).should('be.visible')
    cy.get("[data-test='drawer-side-bar-close']").click()
    cy.get("[data-test='sidebar-homebutton']").contains(/home/i).should('not.be.visible')
  })
})