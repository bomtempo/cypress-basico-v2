describe('Testando o privacy', () => {
    it('Privacy', () => {
        cy.visit('../src/privacy.html')

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')

        cy.contains('Talking About Testing').should('to.be.visible')
    });
});