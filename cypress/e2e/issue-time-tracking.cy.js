describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue-create=true');
      });
    });
  
    const number1 = `10`
    const number2 = `20`
    const title = `TEST_TITLE`
    const Mydescription = `My bug description`

    it('Should create an issue and validate it successfully', () => {
        //System finds modal for creating issue and does next steps inside of it
        cy.get('[data-testid="modal:issue-create"]').within(() => {
          cy.get('[data-testid="select:type"]').click();
          cy.get('[data-testid="select-option:Bug"]').click();      
          cy.get('.ql-editor').type(Mydescription);
          cy.get('input[name="title"]').type(title);
          cy.get('button[type="submit"]').click();
        });
    
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
            .should('have.length', '5')
            .first()
            .find('p')
            .contains('TEST_TITLE');
        });

        //Add estimation time
        //Assure that estimation time is saved
        //Verify that issue has "No time is logged"
        cy.contains(`TEST_TITLE`).click();
        cy.contains('No time logged').should('be.visible');
        cy.get('input[placeholder="Number"]').type(number1);
        cy.get('input[placeholder="Number"]').should('exist');
        cy.get('input[placeholder="Number"]').should('have.value', '10');
        cy.get(`button i[data-testid="icon:close"]`).click();
        cy.reload()
        cy.contains(`TEST_TITLE`).click();
        cy.get('input[placeholder="Number"]').should('exist');
        cy.get('input[placeholder="Number"]').should('be.visible', '10');
        cy.get('button i[data-testid="icon:close"]').click();
    
        //Update estimation time
        //Assure that estimation time is changed
        cy.contains(`TEST_TITLE`).click();
        cy.get('input[placeholder="Number"]').clear().type(number2);
        cy.get('input[placeholder="Number"]').should('exist');
        cy.get('input[placeholder="Number"]').should('have.value', '20');
        cy.get(`button i[data-testid="icon:close"]`).click();
        cy.contains(`TEST_TITLE`).click();
        cy.get('input[placeholder="Number"]').should('exist');
        cy.get('input[placeholder="Number"]').should('be.visible', '20');
        cy.get('button i[data-testid="icon:close"]').click();

        //Removed estimation time
        //Assure that estimation time is removed
        cy.contains(`TEST_TITLE`).click();
        cy.get('input[placeholder="Number"]').clear()
        cy.get('input[placeholder="Number"]').should('be.empty');
        cy.get(`button i[data-testid="icon:close"]`).click();
        cy.contains(`TEST_TITLE`).click();
        cy.get('input[placeholder="Number"]').should('be.empty');
        cy.get(`button i[data-testid="icon:close"]`).click();
         });

        it('Should create an issue and validate it successfully', () => {
        //System finds modal for creating issue and does next steps inside of it
        cy.get('[data-testid="modal:issue-create"]').within(() => {
        cy.get('.ql-editor').type(Mydescription);
        cy.get('input[name="title"]').type(title);
        cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();

        cy.contains('Issue has been successfully created.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]').should('have.length', '5').first().find('p').contains(title);
        });

        //Add time spent + time remaining
        //Assure that time spent and time remaiting is saved
        cy.contains(`TEST_TITLE`).click();
        cy.contains(`No time logged`).click();
        cy.get(`[data-testid="modal:tracking"]`).should(`be.visible`);
        cy.get(`[placeholder="Number"]`).eq(1).type(2);
        cy.get(`[placeholder="Number"]`).eq(2).type(5);
        cy.contains(`button`, `Done`).click();
        cy.get(`[data-testid="icon:stopwatch"]`).next()
        .should(`contain`, `2h logged`)
        .should(`contain`, `5h remaining`);

        //Remove logged time
        //Assure that time tracking section and added time remaining value is removed
        cy.get(`[data-testid="icon:stopwatch"]`).click();
        cy.get(`[data-testid="modal:tracking"]`).should(`be.visible`);
        cy.get(`[placeholder="Number"]`).eq(1).clear();
        cy.get(`[placeholder="Number"]`).eq(2).clear();
        cy.contains(`button`, `Done`).click();
        cy.get(`[data-testid="icon:stopwatch"]`).next()
        .should(`contain`, `No time logged`);
        
         });
    });


