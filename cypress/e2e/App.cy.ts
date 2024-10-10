import { ERROR_FETCH_DATA_CHANCE } from '../../src/api/fetchData';
import {
  APP_TITLE,
  APP_SUBTITLE,
  TEST_IDS,
  INSTRUCTIONS,
} from '../../src/stringConstants';

describe('Visiting the home page', () => {
  // The data "fetch" success or fail hinges on Math.random.
  // This override enforces that the Math.random result will be over the "success" threshold
  Cypress.on('window:before:load', (win) => {
    cy.stub(win.Math, 'random').callsFake(() => ERROR_FETCH_DATA_CHANCE + 0.1);
  });

  it('Shows the header', () => {
    cy.visit('/');
    cy.contains('h1', APP_TITLE).should('be.visible');
    cy.contains('h6', APP_SUBTITLE).should('be.visible');
  });

  it('Shows the table and instructions', () => {
    cy.visit('/');

    // checking for the "data" case because Math.random is stubbed to always succeed
    cy.get(`[data-testid="${TEST_IDS.TABLE_DATA}"]`).should('be.visible');
    cy.contains(INSTRUCTIONS).should('be.visible');
    cy.get(`[data-testid="${TEST_IDS.EDIT_TOGGLE_BUTTON}"]`).should(
      'be.visible'
    );
  });
});
