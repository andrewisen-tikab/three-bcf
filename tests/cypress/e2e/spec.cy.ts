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

describe('template spec', () => {
    it('passes', () => {
        cy.visit('/');

        // State should be empty
        accessState((bcfState) => {
            expect(bcfState.topics).to.have.length(0);
            expect(bcfState.selectedTopic).to.be.null;
        });

        // Create new topic
        cy.get(`#${TEST.NEW_ISSUE}`).click();

        // Should have a topic, and should be selected
        accessState((bcfState) => {
            expect(bcfState.topics).to.have.length(1);
            expect(bcfState.selectedTopic).to.not.be.null;
        });
    });
});
