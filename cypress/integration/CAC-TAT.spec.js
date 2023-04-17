/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html')
});
describe('Central de Atendimento ao Cliente TAT', function () {
    //#region 
    const THREE_SECONDS_IN_MS = 3000 
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Lorem ipsum dolor sit amet. Um este este é este personalizado é este este. sonalizado personalizado um personalizado texto.'
        cy.clock()
        cy.get('#firstName').click().type('Danilo')
        cy.get('#lastName').click().type('Lima')
        cy.get('#email').click().type('danilo.lima@outlook.com')
        cy.get('#open-text-area').click().type(longText, { delay: 0 })
        cy.contains('.button[type="submit"]', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS) // avança 3s no tempo
        cy.get('.success').should('not.be.visible')

    });
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName').click().type('Danilo')
        cy.get('#lastName').click().type('Lima')
        cy.get('#email').click().type('danilolimma.com.br')
        cy.get('#open-text-area').click().type('Gostaria de solicitar reembolso', { delay: 0 })
        cy.contains('.button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })
    it('Valida telefone não numérico', () => {
        cy.get('#phone').type('asf').should('not.have.value')
    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.clock()
        cy.get('#phone-checkbox').check()
        cy.get('#firstName').click().type('Danilo')
        cy.get('#lastName').click().type('Lima')
        cy.get('#email').click().type('danilolimma@outlook.com.br')
        cy.get('#open-text-area').click().type('Gostaria de solicitar reembolso', { delay: 0 })
        cy.contains('.button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName').type('Danilo').should('have.value', 'Danilo').clear().should('have.value', '')
        cy.get('#lastName').type('Lima').should('have.value', 'Lima').clear().should('have.value', '')
        cy.get('#email').type('danilolimma@outlook.com.br').should('have.value', 'danilolimma@outlook.com.br').clear().should('have.value', '')
        cy.get('#phone').type('123456', { delay: 10 }).should('have.value', '123456').clear().should('have.value', '')
    });


    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
       cy.clock()
        cy.contains('.button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });

    it('Envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    });

    it('Seleciona um produto (YouTube) por seu texto', () => {
        //busca o elemento e ID do elemento
        cy.get('select#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });
    it('Seleciona um produto (Mentoria) por seu valor', () => {
        cy.get('select')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });
    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('select')
            .select(1)
            .should('have.value', 'blog')
    });
    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });
    it('Marca cada tipo de atendimento', () => {
        cy.get('input[value="ajuda"]').check().should('be.checked')
        cy.get('input[value="elogio"]').check().should('be.checked')
        cy.get('input[value="feedback"]').check().should('be.checked')
    });
    it('Marca cada tipo de atendimento com cy.each e cy.wrap', () => {
        cy.get('input[type="radio"]').should('have.length', 3)
            .each(($ba) => {
                cy.wrap($ba).check().should('be.checked')
            })
    })
    //#endregion
    //#region
    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('Seleciona um arquivo com cy.selectFile', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            //.selectFile('C:/Users/danilo.lima/Desktop/GuideBR_DropIT.pdf')
            .should(function (input){
                {console.log(input)
                //expect(input[0].files[0].name)
                  //  .to.equal('example.json')
            }})
    });
    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json',{ action: 'drag-drop' })
        .should(function (input) {
            //{console.log(input)
            expect(input[0].files[0].name)
            .to.equal('example.json')
        });
        
    });
    it('Seleciona um arquivo utilizando cy.fixture com alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
        .should(function (input) {
            //{console.log(input)
            expect(input[0].files[0].name)
            .to.equal('example.json')
        });
        
    });
    //#endregion
    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a[href="privacy.html"]')
        .should('have.attr', 'target', '_blank')
    });
     it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]')
        .invoke('removeAttr','target')
        .click()

        cy.get('#title')
        .should('have.text','CAC TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')
     });

   
});

