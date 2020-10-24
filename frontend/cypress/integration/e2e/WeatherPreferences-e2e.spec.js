describe('Weather Preferences', () => {
  beforeEach(() => {
    cy.visitWithMockGeolocation('/', {
      latitude: 60.2,
      longitude: 25.0,
    });
  });

  it(
    'should adjust distance to ideal weather display based on temperature adjustement',
    { viewportHeight: 1080, viewportWidth: 1920 },
    () => {
      cy.findByText(/Ideal.* 67%/i).should('be.visible');
      cy.findByText(/Ideal.* 52%/i).should('not.be.visible');

      cy.findByRole('button', { name: /next/i }).click();
      cy.findAllByText(/Ideal.* 52%/i)
        .first()
        .should('be.visible');

      cy.findByRole('button', { name: /preferen.*/i }).click();
      cy.findByRole('heading', { name: /Ideal commute weather/i }).should(
        'be.visible'
      );

      cy.findByRole('group', { name: /temperature/i })
        .findByDisplayValue('20')
        .clear()
        .type('10');

      cy.findByRole('group', { name: /temperature/i })
        .findByRole('slider')
        .should('have.value', 100)
        .invoke('val', 50)
        .trigger('input');

      cy.findByRole('button', { name: /save/i }).click();

      cy.findByText(/Ideal.* 67%/i).should('not.be.visible');
      cy.findByText(/Ideal.* 52%/i).should('not.be.visible');

      cy.findByText(/tomorrow/i).should('be.visible');
      cy.findByText(/Ideal.* 48%/i).should('be.visible');
      cy.findAllByText(/Ideal.* 58%/i)
        .first()
        .should('be.visible');
    }
  );

  it(
    'should adjust distance to ideal weather display based on temperature adjustement',
    { viewportHeight: 1080, viewportWidth: 1920 },
    () => {
      cy.findByText(/Ideal.* 67%/i).should('be.visible');

      cy.findByRole('button', { name: /preferen.*/i }).click();
      cy.findByRole('heading', { name: /Ideal commute weather/i }).should(
        'be.visible'
      );

      cy.findByRole('group', { name: /temperature/i })
        .findByDisplayValue('20')
        .clear()
        .type('10');
      cy.findByRole('group', { name: /temperature/i })
        .findByRole('slider')
        .invoke('val', 50)
        .trigger('input');
      cy.findByRole('group', { name: /humidity/i })
        .findByDisplayValue('50')
        .clear()
        .type('80');
      cy.findByRole('group', { name: /humidity/i })
        .findByRole('slider')
        .should('have.value', 100)
        .invoke('val', 70)
        .trigger('input');

      cy.findByRole('button', { name: /save/i }).click();

      cy.findByText(/Ideal.* 67%/i).should('not.be.visible');

      cy.findAllByText(/Ideal.* 77%/i)
        .first()
        .should('be.visible');

      cy.findByRole('button', { name: /preferen.*/i }).click();
      cy.findByRole('group', { name: /humidity/i })
        .findByRole('slider')
        .should('have.value', 70)
        .invoke('val', 50)
        .trigger('input');
      cy.findByRole('button', { name: /save/i }).click();

      cy.findAllByText(/Ideal.* 77%/i)
        .first()
        .should('not.be.visible');
      cy.findAllByText(/Ideal.* 78%/i)
        .first()
        .should('be.visible');
    }
  );

  it(
    'should show 100% suitability if priority is none for all weather factors',
    { viewportHeight: 1080, viewportWidth: 1920 },
    () => {
      cy.findByRole('button', { name: /preferen.*/i }).click();

      cy.findByRole('group', { name: /temperature/i }).findByRole('slider');

      cy.findByRole('group', { name: /temperature/i })
        .findByRole('slider')
        .invoke('val', 0)
        .trigger('input');
      cy.findByRole('group', { name: /humidity/i })
        .findByRole('slider')
        .invoke('val', 0)
        .trigger('input');

      cy.findByRole('button', { name: /save/i }).click();

      cy.findByText(/Ideal.* 67%/i).should('not.be.visible');
      cy.findByText(/Ideal.* 52%/i).should('not.be.visible');
      cy.findAllByText(/Ideal.* 100%/i)
        .should('have.length', 8)
        .first()
        .should('be.visible');
    }
  );
});
