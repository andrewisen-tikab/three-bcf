import * as TEST from '../../../example/test';
import type { BCFState } from '../../../example/react/state/bcfSlice';

const accessState = (callback: (bcfState: BCFState) => void) => {
    cy.window()
        .its('store')
        .invoke('getState')
        .its('bcf')
        .then((bcfState: BCFState) => {
            callback(bcfState);
        });
};

const TITLE = 'New title';

describe('BCF spec', () => {
    it('New topic', () => {
        cy.visit('/');

        // State should be empty.
        accessState((bcfState) => {
            expect(bcfState.topics).to.have.length(0);
            expect(bcfState.selectedTopic).to.be.null;
        });

        // Create new topic.
        cy.get(`#${TEST.NEW_TOPIC}`).click();

        // Should have a topic, and should be selected.
        accessState((bcfState) => {
            expect(bcfState.topics).to.have.length(1);
            expect(bcfState.selectedTopic).to.not.be.null;
        });
    });

    it('Modify topic', () => {
        cy.visit('/');

        // Create new topic.
        cy.get(`#${TEST.NEW_TOPIC}`).click();

        // Modify title.
        // This will mostly test react and redux.
        cy.get(`#${TEST.BCF_TITLE}`).type(TITLE);

        // Title should be update in state.
        accessState((bcfState) => {
            expect(bcfState.selectedTopic.title).to.equal(TITLE);
        });

        // Create a new topic. Should deselect the previous topic.
        cy.get(`#${TEST.NEW_TOPIC}`).click();
        accessState((bcfState) => {
            expect(bcfState.selectedTopic.title).to.not.equal(TITLE);
        });
    });

    it('Create BCF file', () => {
        // Delete previous file
        cy.exec('rm -rf cypress/downloads/presentation.bcf');

        // Create new topic.
        cy.visit('/');
        cy.get(`#${TEST.NEW_TOPIC}`).click();

        // Export file
        cy.get(`#${TEST.CREATE_BCF}`).click();

        // Wait 2 seconds for file to be created.
        cy.wait(2_000);

        cy.readFile('cypress/downloads/presentation.bcf').should('exist');
    });
});
