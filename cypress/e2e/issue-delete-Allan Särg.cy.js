describe('Delete Issue', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            // Open the first issue from the board
            cy.visit(url);
            cy.get('[data-testid="list-issue"]').first().click();

        });

        // Assert that issue detail view modal is visible
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });

    it('Should delete an issue successfully', () => {
        // Click delete button and confirm deletion
        cy.get('[data-testid="icon:trash"]').parent().click();
        cy.contains('Delete issue').click();
        // Assert that the deletion confirmation dialogue is not visible
        cy.get('[data-testid="modal:confirmation"]').should('not.exist');

        // Assert that the issue is deleted and not displayed on the Jira board anymore
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
            cy.contains('This is an issue of type: Task.').should('not.exist');
        });
    });


    it('Should cancel deleting an issue', () => {


        // Click delete issue button
        cy.get('[data-testid="icon:trash"]').parent().click();

        // Cancel the deletion in the confirmation pop-up
        cy.contains('Cancel').click();

        // Assert that the deletion confirmation dialogue is not visible
        cy.get('[data-testid="modal:confirmation"]').should('not.exist');

        // Assert that the issue is not deleted and still displayed on the Jira board
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]').should('exist');
        });
    });

})