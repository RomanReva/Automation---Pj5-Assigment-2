describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue-create=true');
      });
    });
  

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const number = `5`
    const title = `TEST_TITLE`
    const Mydescription = `My bug description`

    it.only('Should create an issue and validate it successfully', () => {
        //System finds modal for creating issue and does next steps inside of it
        cy.get('[data-testid="modal:issue-create"]').within(() => {
      
        //open issue type dropdown and choose Bug
        cy.get('[data-testid="select:type"]').click();
        cy.get('[data-testid="select-option:Bug"]')
            .trigger('click');
              
        //Type value to description input field
        cy.get('.ql-editor').type(Mydescription);
  
        //Type value to title input field
        //Order of filling in the fields is first description, then title on purpose
        //Otherwise filling title first sometimes doesn't work due to web page implementation
        cy.get('input[name="title"]').type(title);
        
        //Select Pickle Rick from reporter dropdown
        cy.get('[data-testid="select:reporterId"]').click();
        cy.get('[data-testid="select-option:Pickle Rick"]').click();
  
        //Select Highest from priority dropdown
        cy.get('[data-testid="select:priority"]').click();
        cy.get('[data-testid="select-option:Highest"]').click();
  
        //Click on button "Create issue"
        cy.get('button[type="submit"]').click();
       
        //Assert that modal window is closed
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
    
        //Reload the page to be able to see recently created issue
         cy.reload();
         cy.contains('Issue has been successfully created.').should('not.exist');

         
    });
        


        it('Should сreate an issue and add, edit and remove estimation time successfully', () => {
        getIssueDetailsModal().within(() => {
            //add estimation time
            cy.contains(`Original Estimate (hours)`).click();
            cy.get('input[placeholder="Number"]').clear().type(number);
            cy.get('input[placeholder="Number"]').should('exist');
            cy.get('input[placeholder="Number"]').should('have.value', '5')
    


    });
});
})
})

