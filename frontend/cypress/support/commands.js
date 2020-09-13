import '@testing-library/cypress/add-commands';

Cypress.Commands.add(
  'visitWithMockGeolocation',
  // default to Helsinki
  (url, { latitude = 60.2, longitude = 25 }) => {
    const mockGeolocation = (win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition', (cb) =>
        cb({ coords: { latitude, longitude } })
      );
    };
    cy.visit(url, {
      onBeforeLoad: (win) => {
        mockGeolocation(win, latitude, longitude);
      },
    });
  }
);
