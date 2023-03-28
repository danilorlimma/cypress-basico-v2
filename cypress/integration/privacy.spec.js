it('Testa a pagina de política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT')
    .should('be.visible')
});