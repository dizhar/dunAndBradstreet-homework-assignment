describe("Special Offer Booking Via Happy Hour", () => {
  beforeEach(() => {
    cy.fixture("bookingData").as("bookingData");
    // Step 1: Navigate to the Ontopo homepage (using the full URL for clarity)
    cy.visit("/");
    cy.document().its("readyState").should("eq", "complete");
  });

  it("should complete a special offer booking via happy hour", () => {
    cy.fixture("bookingData").then((bookingData) => {
      // Step 1:  Select country Israel
      cy.selectCountry(bookingData.SpecialBooking.country);

      // Step 2: Click on the Happy Hour section.
      cy.selectCity(bookingData.SpecialBooking.city);

      cy.findAllByRole("link", { name: /Happy Hour/i })
        .filter(":visible")
        .filter((index, el) => !Cypress.$(el).hasClass("cursor-not-allowed"))
        .first()
        .click();

      // Step 5: Click on the Special Offering button.
      cy.findAllByAltText(/Promotion icon/i)
        .first()
        .scrollIntoView({ easing: "linear" })
        .should("be.visible")
        .wait(500)
        .click();

      // Step 6: Click on the Booking button.
      cy.clickBookingButton();

      // step 7: Select 6 people for the reservation.
      cy.selectPeople(bookingData.SpecialBooking.numPeople);

      // step 8: Click on Find me.
      cy.findByRole("button", { name: /Find me/i })
        .should("be.visible")
        .should("not.be.disabled")
        .click();

      // step 9: Click on the first available "Book now" option from the options list
      cy.get(".options-container .cursor-pointer")
        .first()
        .contains("Book now")
        .click();

      // Step 10: Verify that you are redirected to the Booking Details Page.
      cy.url().should("match", /checkout/);
      // Verify a unique element on the Booking Details Page is visible
      cy.findAllByText("Booking details").first().should("be.visible");
    });
  });
});
