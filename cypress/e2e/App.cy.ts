import { ERROR_FETCH_DATA_CHANCE } from '../../src/api/fetchData';
import { APP_TITLE } from '../../src/stringConstants';

describe('Application', () => {
  it('visits the home page', () => {
    // The data "fetch" success or fail hinges on Math.random.
    // This override enforces that the Math.random result will be over the "success" threshold
    Cypress.on('window:before:load', (win) => {
      cy.stub(win.Math, 'random').callsFake(
        () => ERROR_FETCH_DATA_CHANCE + 0.1
      );
    });

    cy.visit('/');
    cy.contains('h1', APP_TITLE).should('be.visible');
  });
});
