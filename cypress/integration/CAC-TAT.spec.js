/// <reference types="Cypress" />


beforeEach(() => {
    cy.visit('./src/index.html')

});
describe('Central de Atendimento ao Cliente TAT', function () {
    //#region 
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Lorem ipsum dolor sit amet. Um este este é este personalizado é este este. sonalizado personalizado um personalizado texto.'
        cy.get('#firstName').click().type('Danilo')
        cy.get('#lastName').click().type('Lima')
        cy.get('#email').click().type('danilo.lima@outlook.com')
        cy.get('#open-text-area').click().type(longText, { delay: 1 })
        cy.contains('.button[type="submit"]','Enviar').click()
        cy.get('.success').should('be.visible')
      
    });
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').click().type('Danilo')
        cy.get('#lastName').click().type('Lima')
        cy.get('#email').click().type('danilolimma.com.br')
        cy.get('#open-text-area').click().type('Gostaria de solicitar reembolso', { delay: 10 })
        cy.contains('.button[type="submit"]','Enviar').click()
        cy.get('.error').should('be.visible')

    })
    it('Valida telefone não numérico', () => {
        cy.get('#phone').type('asf').should('not.have.value')
    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.get('#phone-checkbox').click()
        cy.get('#firstName').click().type('Danilo')
        cy.get('#lastName').click().type('Lima')
        cy.get('#email').click().type('danilolimma@outlook.com.br')
        cy.get('#open-text-area').click().type('Gostaria de solicitar reembolso', { delay: 10 })
        cy.contains('.button[type="submit"]','Enviar').click()
        cy.get('.error').should('be.visible')
        
    });
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
       
        cy.get('#firstName').type('Danilo').should('have.value','Danilo').clear().should('have.value','')
        cy.get('#lastName').type('Lima').should('have.value','Lima').clear().should('have.value','')
        cy.get('#email').type('danilolimma@outlook.com.br').should('have.value','danilolimma@outlook.com.br').clear().should('have.value','')
        cy.get('#phone').type('123456', { delay: 10 }).should('have.value','123456').clear().should('have.value','')
    });
//#endregion

it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button[type="submit"]','Enviar').click()
    cy.get('.error').should('be.visible')
});

it('Envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
});

it.only('Seleciona um produto (YouTube) por seu texto', () => {
    //busca o elemento e ID do elemento
    cy.get('select#product').select('YouTube').should('have.value','youtube')
});
it.only('Seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('select').select('mentoria').should('have.value','mentoria')
});
it.only('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select(1).should('have.value','blog')
});

})

