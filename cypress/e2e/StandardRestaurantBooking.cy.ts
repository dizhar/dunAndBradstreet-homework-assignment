describe("Standard Restaurant Booking", () => {
  beforeEach(() => {
    // Step 1: Navigate to the Ontopo homepage (using the full URL for clarity)
    cy.visit("/");
    cy.document().its("readyState").should("eq", "complete");
  });
  it("should book a restaurant successfully", () => {
    cy.fixture("bookingData").then((bookingData) => {
      // Step 1: Select country Israel
      cy.selectCountry(bookingData.StandardBooking.country);

      // Step 2: Choose Tel Aviv
      cy.selectCity(bookingData.StandardBooking.city);

      // Step 3: Scroll down to view the 4th restaurant in the list
      cy.get("#Restaurants").within(() => {
        cy.get(".home-page-billboard") // Target restaurant billboard sections
          .filter(":visible")
          .eq(3) // (0-based index: 3 means the 4th visible restaurant)
          .scrollIntoView()
          .should("be.visible");
      });

      // Step 6: Click on More details of the 4th restaurant.
      cy.get("#Restaurants").within(() => {
        cy.get(".home-page-billboard") // Target restaurant billboard sections
          .filter(":visible")
          .eq(3) // (0-based index: 3 means the 4th visible restaurant)
          .click();
      });

      // Step 7: Click on the Booking button
      cy.findAllByRole("list")
        .filter(":visible")
        .first()
        .within(() => {
          cy.findByText(/bookings/i).click();
        });

      // Step 8: Select 4 people for the reservation.
      cy.selectPeople(bookingData.StandardBooking.numPeople);

      // Step 9: Click on "Find me a table"
      cy.findByRole("button", { name: /Find me a table/i })
        .should("be.visible")
        .should("not.be.disabled")
        .click();

      // Step 10: Click on the first available option with "Book Now"
      cy.get(".dropdown-menu .shift-item")
        .not(".cursor-not-allowed")
        .first()
        .click()
        .then(() => {
          cy.findByRole("button", { name: /Find me a table/i })
            .should("be.visible")
            .should("not.be.disabled")
            .click();
        });

      // Click on the first available "Book now" option from the options list
      cy.get(".options-container .cursor-pointer")
        .first()
        .contains("Book now")
        .click();

      // Step 11: Verify that you are redirected to the Booking Details Page
      cy.url().should("match", /checkout/);
      cy.findAllByText("Booking details").first().should("be.visible");
    });
  });
});
