describe('Weather card list', () => {
  it('should have correct temperature on temperature cards', () => {
    cy.visitWithMockGeolocation('/', {
      latitude: 60.2,
      longitude: 25.0,
    });

    cy.get('[data-testid=planned-commute-input]').should('have.value', '17:35');

    cy.get('[data-testid=weather-info-card-list]')
      .children()
      .should('have.length', 2);

    cy.get('[data-testid=weather-card-temp]')
      .first()
      .should('have.text', '18.4°C');

    cy.get('[data-testid=weather-card-temp]')
      .eq(1)
      .should('have.text', '17.6°C');
  });

  it('should let user set a new planned commute value and update temperatures accordingly', () => {
    cy.visitWithMockGeolocation('/', {
      latitude: 60.2,
      longitude: 25.0,
    });

    cy.get('[data-testid=planned-commute-input]').should('have.value', '17:35');

    cy.get('[data-testid=planned-commute-input]').type('12:15');
    cy.get('[data-testid=planned-commute-submit-button]').click();

    cy.get('[data-testid=weather-card-temp]')
      .first()
      .should('have.text', '17°C');

    cy.get('[data-testid=weather-card-temp]')
      .eq(1)
      .should('have.text', '17.7°C');
  });
});
