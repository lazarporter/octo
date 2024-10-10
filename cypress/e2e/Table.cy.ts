import { ERROR_FETCH_DATA_CHANCE } from '../../src/api/fetchData';
import { staticData } from '../../src/assets/staticData';
import {
  ERROR_FETCH_DATA,
  TEST_IDS,
  TOGGLE_EDIT_BUTTON_TEXT,
} from '../../src/stringConstants';

describe('Table tests', () => {
  beforeEach(() => {
    Cypress.removeAllListeners('window:before:load');
  });

  it('renders loading spinner', () => {
    cy.visit('/');

    cy.get(`[data-testid="${TEST_IDS.TABLE_LOADING_SPINNER}"]`).should(
      'be.visible'
    );
  });

  describe('When data is successfully fetched', () => {
    beforeEach(() => {
      Cypress.on('window:before:load', (win) => {
        cy.stub(win.Math, 'random').callsFake(
          () => ERROR_FETCH_DATA_CHANCE + 0.1
        );
      });
    });

    it('renders the table', () => {
      cy.visit('/');

      cy.get(`[data-testid="${TEST_IDS.TABLE_DATA}"]`).should('be.visible');
      cy.contains(staticData[0]._id).should('be.visible');
    });

    it('clicking the edit button switches the table to edit mode', () => {
      cy.visit('/');
      cy.get(`[data-testid="${TEST_IDS.TABLE_CELL_ENRICHED}"]`).should(
        'be.visible'
      );
      cy.get(`[data-testid="${TEST_IDS.TABLE_CELL_ENRICHED_EDIT}"]`).should(
        'not.exist'
      );

      cy.contains('button', 'Edit').click();
      cy.get(`[data-testid="${TEST_IDS.TABLE_CELL_ENRICHED}"]`).should(
        'not.exist'
      );
      cy.get(`[data-testid="${TEST_IDS.TABLE_CELL_ENRICHED_EDIT}"]`).should(
        'be.visible'
      );
    });

    it.skip('clicking the save button commits the staged edits', () => {
      const originallyFalseRow = staticData.find(
        (row) => !row.enriched.isCrownJewel
      );

      cy.visit('/');
      cy.contains('button', TOGGLE_EDIT_BUTTON_TEXT.EDIT).click();

      // Change the originally false row to true
      cy.get(`tr:contains("${originallyFalseRow._id}")`)
        .first()
        .within(() => {
          cy.get(
            `[data-testid="${TEST_IDS.TABLE_CELL_ENRICHED_EDIT}"]`
          ).click();
        });
      cy.get('li').contains('True').click();

      // Verify the change in the dropdown (in edit mode, before saving)
      cy.get(`tr:contains("${originallyFalseRow._id}")`)
        .first()
        .within(() => {
          cy.get(`[data-testid="${TEST_IDS.TABLE_CELL_ENRICHED_EDIT}"]`).should(
            'have.value',
            'true'
          );
        });

      // save the change
      cy.contains('button', TOGGLE_EDIT_BUTTON_TEXT.SAVE).click();

      // Verify the change in the table after saving (out of edit mode)
      cy.get(`tr:contains("${originallyFalseRow._id}")`)
        .first()
        .within(() => {
          cy.get(`[data-testid="${TEST_IDS.CROWN_JEWEL}"]`).should('exist');
        });
    });
  });

  describe('When data fetch fails', () => {
    beforeEach(() => {
      Cypress.on('window:before:load', (win) => {
        cy.stub(win.Math, 'random').callsFake(
          () => ERROR_FETCH_DATA_CHANCE - 0.1
        );
      });

      Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes(ERROR_FETCH_DATA)) {
          return false;
        }
      });
    });

    it('displays error message', () => {
      cy.visit('/');

      cy.get(`[data-testid="${TEST_IDS.TABLE_DATA}"]`).should('not.exist');
      cy.get(`[data-testid="${TEST_IDS.ERROR_FALLBACK}"]`, {
        timeout: 2000,
      }).should('be.visible');
      cy.contains('h6', ERROR_FETCH_DATA).should('be.visible');
    });

    it('the try again button causes a new fetch', () => {
      cy.visit('/');

      cy.get(`[data-testid="${TEST_IDS.ERROR_FALLBACK}"]`).should('be.visible');
      cy.contains('button', 'Try again').click();
      cy.get(`[data-testid="${TEST_IDS.TABLE_LOADING_SPINNER}"]`).should(
        'be.visible'
      );
    });
  });
});
