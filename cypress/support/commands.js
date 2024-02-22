Cypress.Commands.add('fillMandatoryFieldsAndSubmit',() => {
    cy.get('#firstName')
        .should('be.visible').type('Alex')

        cy.get('#lastName').should('be.visible').type('Bomtempo')

        cy.get('#email').should('be.visible').type('alexbomtempo@teste.com')

        cy.get(':nth-child(4) > input').should('be.visible').click()

        cy.get('#open-text-area').should('be.visible').type('teste')

        cy.get('button[type="submit"]').should('be.visible').click()
})