// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', () => {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(() => {
        cy.visit('src/index.html')
    });
    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = "Realizando um teste automatizado com cypress, aprendendo com o curso do Walmir Filho, o melhor professor de testes automatizados com cypress do Brasil"

        cy.clock()

        cy.get('#firstName')
            .should('be.visible').type('Alex')

        cy.get('#lastName').should('be.visible').type('Bomtempo')

        cy.get('#email').should('be.visible').type('alexbomtempo@teste.com')

        cy.get('#product').should('be.visible').select('Cursos')

        cy.get(':nth-child(4) > input').should('be.visible').click()

        cy.get('#open-text-area').should('be.visible').type(longText, { delay: 0 })

        cy.contains('button', 'Enviar').should('be.visible').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')

    });

    it('Exibe mensgem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName').should('be.visible').type('Alex')

        cy.get('#lastName').should('be.visible').type('Bomtempo')

        cy.get('#email').should('be.visible').type('alexbomtempo@teste,com')

        cy.get('#product').should('be.visible').select('Cursos')

        cy.get(':nth-child(4) > input').should('be.visible').click()

        cy.get('#open-text-area').should('be.visible').type('Teste')

        cy.get('button[type="submit"]').should('be.visible').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });

    it('Campo telefone continua vazio quando preenchido com valor não númerico', () => {
        cy.get('#phone')
            .type('asdgsdgf')
            .should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        cy.get('#firstName').should('be.visible').type('Alex')

        cy.get('#lastName').should('be.visible').type('Bomtempo')

        cy.get('#email').should('be.visible').type('alexbomtempo@teste.com')

        cy.get('#phone-checkbox').check()

        cy.get('#product').should('be.visible').select('Cursos')

        cy.get(':nth-child(4) > input').should('be.visible').click()

        cy.get('#open-text-area').should('be.visible').type('Teste')

        cy.get('button[type="submit"]').should('be.visible').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .should('be.visible')
            .type('Alex')
            .should('have.value', 'Alex')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .should('be.visible')
            .type('Bomtempo')
            .should('have.value', 'Bomtempo')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .should('be.visible')
            .type('Bomtempo')
            .should('have.value', 'Bomtempo')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .should('be.visible')
            .type('alex@teste.com')
            .should('have.value', 'alex@teste.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .should('be.visible')
            .type('619999999')
            .should('have.value', '619999999')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .should('be.visible')
            .type('Realizando um teste automatizado com cypress, aprendendo com o curso do Walmir Filho, o melhor professor de testes automatizados com cypress do Brasil')
            .should('have.value', 'Realizando um teste automatizado com cypress, aprendendo com o curso do Walmir Filho, o melhor professor de testes automatizados com cypress do Brasil')
            .clear()
            .should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()
        cy.get('button[type="submit"]').should('be.visible').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (Melhoria) por seu valor(value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu indice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });

    it('marca cada tipo de atentimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marcar ambos checkboxes, depois desmarcar o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    // Simular que estamos subindo o arquivo clicando e abrindo o arquivo
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    // Simular que estamos subindo o arquivo arrastando
    it('selecionar um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    it('selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('to.be.visible')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    });

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    });

    it.only('Encontre o Gato', () => {
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .invoke('hide')
            .should('not.be.visible')
    })
});