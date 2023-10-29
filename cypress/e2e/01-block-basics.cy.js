import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: Empty', () => {
    // Change page title
    cy.get('[contenteditable=true]').first().clear();

    cy.get('[contenteditable=true]').first().type('My Add-on Page');

    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.get('[contenteditable=true]').first().type('{enter}');

    // Add search block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.search')
      .contains('Search')
      .click({ force: true });
    // add temporal coverage facet
    cy.get('#blockform-fieldset-facets').click();
    cy.get('[aria-label="Add Facet"]').click();

    cy.get('#field-type-2-facets-0').click();
    cy.get('.react-select__menu').contains('Temporal Coverage').click();
    cy.get('.years-input').get('input').first().type(2000, { force: true });
    cy.get('.years-input').get('.right input').type(2000, { force: true });
    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');
  });
});
