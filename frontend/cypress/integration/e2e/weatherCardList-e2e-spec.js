describe('Weather card list', () => {
  beforeEach(() => {
    cy.visitWithMockGeolocation('/', {
      latitude: 60.2,
      longitude: 25.0,
    });
  });

  it('should have correct temperature on temperature cards and correct amount of cards by default', () => {
    cy.findByText('Today').should('exist');
    cy.findByText('Today').should('be.visible');
    cy.findByText('Tomorrow').should('exist');
    cy.findByText('Tomorrow').should('not.be.visible');

    cy.findAllByText(/°C/).should('have.length', 8);

    cy.findAllByText(/°C/).first().as('firstWeatherCard');
    cy.findAllByText(/°C/).eq(3).as('fourthWeatherCard');

    cy.get('@firstWeatherCard').should('have.text', '18.4°C');
    cy.get('@firstWeatherCard').should('be.visible');
    cy.get('@fourthWeatherCard').should('have.text', '15.9-16.8°C');
    cy.get('@fourthWeatherCard').should('not.be.visible');
  });

  it('should allow cycling visible weather cards', () => {
    cy.findByText('Today').should('be.visible');
    cy.findByText('Tomorrow').should('not.be.visible');

    cy.findByLabelText(/previous day/i).should('be.disabled');
    cy.findByLabelText(/next day/i).should('not.be.disabled');

    cy.findByLabelText(/next day/i).click();
    cy.findByLabelText(/previous day/i).should('not.be.disabled');

    cy.findByText('Today').should('not.be.visible');
    cy.findByText('Tomorrow').should('be.visible');
  });

  it('should let user set a new planned commute value and update temperatures accordingly', () => {
    cy.findByLabelText(/Time of planned/i).should('not.be.visible');

    cy.findByLabelText(/Open menu/i).click();

    cy.findByLabelText(/Time of planned/i).should('have.value', '17:30');
    cy.findByLabelText(/Time of planned/i).type('03:15');

    cy.findByRole('button', { name: 'Confirm' }).click();

    cy.findByText('17.2°C').should('exist');
    cy.findByText('18.3°C').should('exist');
    cy.findByText('18.3°C').should('not.be.visible');

    cy.findByLabelText(/Close menu/i).click();
    cy.findByLabelText(/Time of planned/i).should('not.be.visible');
  });
});
