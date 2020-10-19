// TODO: organize these tests better according to screen sizes maybe. Or something else idk
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

  describe('should let user set a new planned commute value and update temperatures accordingly', () => {
    it(
      'with screen size 1920x1080',
      { viewportHeight: 1080, viewportWidth: 1920 },
      () => {
        cy.findByRole('button', { name: /Close/i }).should('be.visible');

        cy.findByLabelText(/Time of planned/i).should('have.value', '17:30');
        cy.findByLabelText(/Time of planned/i).type('03:15');

        cy.findByRole('button', { name: 'Confirm' }).click();

        cy.findByText('17.2°C').should('exist');
        cy.findByText('18.3°C').should('exist');
        cy.findByText('18.3°C').should('not.be.visible');

        cy.findByRole('button', { name: /Close/i }).click();
        cy.findByLabelText(/Time of planned/i).should('not.be.visible');
      }
    );

    it(
      'with screen size ipad-mini',
      { viewportHeight: 1024, viewportWidth: 768 },
      () => {
        cy.findByRole('button', { name: /Close/i }).should('be.visible');

        cy.findByLabelText(/Time of planned/i).should('have.value', '17:30');
        cy.findByLabelText(/Time of planned/i).type('03:15');

        cy.findByRole('button', { name: 'Confirm' }).click();

        cy.findByText('17.2°C').should('exist');
        cy.findByText('18.3°C').should('exist');
        cy.findByText('18.3°C').should('not.be.visible');

        cy.findByRole('button', { name: /Close/i }).click();
        cy.findByLabelText(/Time of planned/i).should('not.be.visible');
      }
    );

    // Note: scroll listeners don't seem to trigger within cypress for some reason. Needs investigating
    it(
      'with screen size of "phone"',
      { viewportHeight: 760, viewportWidth: 360 },
      () => {
        cy.findByRole('button', { name: /Close/i }).should('be.visible');

        cy.findByLabelText(/Time of planned/i).should('have.value', '17:30');
        cy.findByLabelText(/Time of planned/i).type('03:15');

        cy.findByRole('button', { name: 'Confirm' }).click();

        cy.findByText('17.2°C').should('exist');
        cy.findByText('18.3°C').should('exist');
        cy.findByText('18.3°C').should('not.be.visible');

        cy.findByRole('button', { name: /Close/i }).click();
        cy.findByLabelText(/Time of planned/i).should('not.be.visible');
      }
    );

    it(
      'with screen size 830x600 (small tablet)',
      { viewportHeight: 600, viewportWidth: 830 },
      () => {
        cy.findByRole('button', { name: /open/i }).should('be.visible');
        cy.findByLabelText(/Time of planned/i).should('not.be.visible');

        cy.findByRole('button', { name: /open/i }).click();
        cy.findByLabelText(/Time of planned/i).should('have.value', '17:30');
        cy.findByLabelText(/Time of planned/i).type('03:15');

        cy.findByRole('button', { name: 'Confirm' }).click();

        cy.findByText('17.2°C').should('be.visible');
        cy.findByText('18.3°C').should('exist');
        cy.findByText('18.3°C').should('not.be.visible');

        cy.findByLabelText(/next day/i).click();
        cy.findByText('18.3°C').should('be.visible');

        cy.findByRole('button', { name: /Close/i }).click();
        cy.findByLabelText(/Time of planned/i).should('not.be.visible');
      }
    );
  });
});
