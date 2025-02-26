/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to select a country.
     * @example cy.selectCountry("Israel")
     */
    selectCountry(country: string): Chainable<Subject>;

    /**
     * Custom command to select a city.
     * @example cy.selectCity("Tel Aviv")
     */
    selectCity(city: string): Chainable<Subject>;

    /**
     * Custom command to click on the booking button.
     * @example cy.clickBookingButton()
     */
    clickBookingButton(): Chainable<Subject>;

    /**
     * Custom command to select the number of people.
     * @example cy.selectPeople(6)
     */
    selectPeople(numPeople: number): Chainable<Subject>;
  }
}
