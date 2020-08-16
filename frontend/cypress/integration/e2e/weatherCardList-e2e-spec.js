describe('Weather card list', () => {
  beforeEach(() => {
    // TODO: maybe make this global in tests somehow
    // mock time to be able to use mocked external responses that would otherwise change over time
    cy.clock(new Date('2020-07-27T18:00:00').getTime());
  });

  it('should have correct temperature on temperature cards and correct amount of cards by default', () => {
    cy.visitWithMockGeolocation('/', {
      latitude: 60.2,
      longitude: 25.0,
    });

    cy.get('[data-testid=planned-commute-input]').should('have.value', '17:30');

    cy.get('[data-testid=weather-info-card-list]')
      .children()
      .should('have.length', 8);

    cy.get('[data-testid=weather-card-temp]')
      .first()
      .should('have.text', '18.4°C');

    cy.get('[data-testid=weather-card-temp]')
      .eq(1)
      .should('have.text', '17.6°C');

    cy.get('[data-testid=weather-card-temp]')
      .eq(2)
      .should('have.text', '16.7-17.5°C');

    cy.get('[data-testid=weather-card-temp]')
      .eq(3)
      .should('have.text', '15.9-16.8°C');
  });

  it('should let user set a new planned commute value and update temperatures accordingly', () => {
    cy.visitWithMockGeolocation('/', {
      latitude: 60.2,
      longitude: 25.0,
    });

    cy.get('[data-testid=planned-commute-input]').should('have.value', '17:30');

    cy.get('[data-testid=planned-commute-input]').type('03:15');
    cy.get('[data-testid=planned-commute-submit-button]').click();

    cy.get('[data-testid=weather-card-temp]')
      .first()
      .should('have.text', '17.2°C');

    cy.get('[data-testid=weather-card-temp]')
      .eq(1)
      .should('have.text', '18.3°C');

    cy.get('[data-testid=weather-card-temp]')
      .eq(2)
      .should('have.text', '16.7-17.5°C');

    cy.get('[data-testid=weather-card-temp]')
      .eq(3)
      .should('have.text', '15.9-16.8°C');
  });
});
