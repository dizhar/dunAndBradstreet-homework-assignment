/// <reference path="./commands.d.ts" />

Cypress.Commands.add("selectCountry", (country: string) => {
  // Step 1: Click on "Choose a country" and wait until it's no longer visible.
  cy.findByText(/Choose a country/i)
    .scrollIntoView({ easing: "linear" })
    .should("be.visible")
    .should("not.be.disabled")
    .wait(500) // (Temporary workaround; ideally we'd wait dynamically)
    .click();

  cy.findByText(/Choose a country/i, { timeout: 10000 }).should("not.exist");

  // Step 2: Select the specified country.
  cy.contains(new RegExp(country, "i")).should("be.visible").click();
});

Cypress.Commands.add("selectCity", (city: string) => {
  cy.findAllByText(new RegExp(city, "i"))
    .filter(":visible")
    .eq(0)
    .should("exist")
    .should("be.visible")
    .wait(500) // (Temporary wait for dynamic UI update)
    .click({ force: true });
});

Cypress.Commands.add("clickBookingButton", () => {
  cy.waitUntil(
    () =>
      cy
        .findAllByRole("list")
        .filter(":visible")
        .its("length")
        .then((length) => length > 0),
    { timeout: 10000, interval: 500 }
  ).then(() =>
    cy
      .findAllByRole("list")
      .filter(":visible")
      .first()
      .within(() => cy.findByText(/bookings/i).click())
  );
});

Cypress.Commands.add("selectPeople", (numPeople: number) => {
  cy.get(".dropdown-menu.no-wrap.column")
    .within(() => {
      cy.findByText(new RegExp(`${numPeople} people`, "i"))
        .should("be.visible")
        .click();
    })
    .end();
});
