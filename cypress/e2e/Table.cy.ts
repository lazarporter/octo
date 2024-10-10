import { ERROR_FETCH_DATA_CHANCE } from '../../src/api/fetchData';
import { staticData } from '../../src/assets/staticData';
import { TEST_IDS } from '../../src/stringContants';

describe('Table tests', () => {
  beforeEach(() => {
    Cypress.removeAllListeners('window:before:load');
  });

  describe('When data is successfully fetched', () => {
    beforeEach(() => {
      Cypress.on('window:before:load', (win) => {
        cy.stub(win.Math, 'random').callsFake(
          () => ERROR_FETCH_DATA_CHANCE + 0.1
        );
      });
    });

    it('renders data', () => {
      cy.visit('/');

      cy.get(`[data-testid="${TEST_IDS.TABLE_DATA}"]`).should('be.visible');
      cy.contains(staticData[0]._id).should('be.visible');
    });
  });

  describe('When data fetch fails', () => {
    beforeEach(() => {
      Cypress.on('window:before:load', (win) => {
        cy.stub(win.Math, 'random').callsFake(
          () => ERROR_FETCH_DATA_CHANCE - 0.1
        );
      });
    });

    it('displays error message', () => {
      cy.visit('/');

      cy.get(`[data-testid="${TEST_IDS.TABLE_DATA}"]`).should('not.exist');
      cy.get(`[data-testid="${TEST_IDS.ERROR_FALLBACK}"]`, {
        timeout: 2000,
      }).should('be.visible');
    });
  });
});
