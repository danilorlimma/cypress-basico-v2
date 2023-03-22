// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    const longText = 'Lorem ipsum dolor sit amet. Um este este é este personalizado é este este. sonalizado personalizado um personalizado texto.'
    cy.get('#firstName').click().type('Danilo')
    cy.get('#lastName').click().type('Lima')
    cy.get('#email').click().type('danilo.lima@outlook.com')
    cy.get('#open-text-area').click().type(longText, { delay: 1 })
    cy.get('.button[type="submit"]').click()
    cy.get('.success').should('be.visible')
})