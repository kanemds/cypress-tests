describe('Adjust window witdh and check if sidebar responsive', () => {
  beforeEach(() => {
    cy.visit('/')
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
    cy.getDataTest('sidebar-homebutton').contains(/home/i).should('not.be.visible')
    cy.getDataTest('frontpage-DehazeIcon-sidebar-button-on').click()
    cy.getDataTest('sidebar-homebutton').contains(/home/i).should('be.visible')
    cy.getDataTest('drawer-side-bar-close').click()
    cy.getDataTest('sidebar-homebutton').contains(/home/i).should('not.be.visible')
  })
})