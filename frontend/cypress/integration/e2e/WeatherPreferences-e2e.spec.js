describe('Weather card list', () => {
  beforeEach(() => {
    cy.visitWithMockGeolocation('/', {
      latitude: 60.2,
      longitude: 25.0,
    });
  });

  it(
    'should have correct temperature on temperature cards and correct amount of cards by default',
    { viewportHeight: 1080, viewportWidth: 1920 },
    () => {
      cy.findByText(/Ideal.* 67%/i).should('exist');

      cy.findByRole('button', { name: /preferen.*/i }).click();
      cy.findByRole('heading', { name: /Ideal commute weather/i }).should(
        'be.visible'
      );

      cy.findByRole('group', { name: /temperature/i })
        .findByDisplayValue('20')
        .clear()
        .type('10');
    }
  );
});
