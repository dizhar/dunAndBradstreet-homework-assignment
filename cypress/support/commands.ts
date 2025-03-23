/// <reference path="./commands.d.ts" />

// Navigate to homepage and click logo if visible
Cypress.Commands.add("navigateToHome", () => {
  cy.visit("/");
  cy.get("body").then(($body) => {
    const $logo = $body.find("#nav-bb-logo");
    if ($logo.length && $logo.is(":visible")) {
      cy.wrap($logo).click();
    } else {
      cy.log("Backup logo not found or not visible");
    }
  });
});

// Empty the cart recursively
Cypress.Commands.add("emptyCart", (emptyMessage: string) => {
  cy.get("#nav-cart").should("be.visible").click();
  const deleteAllItems = () => {
    cy.get("body").then(($body) => {
      const deleteButtons = $body.find('input[data-action="delete"]');
      if (deleteButtons.length > 0) {
        cy.wrap(deleteButtons.first()).click({ force: true });
        cy.get("body").then(($body) => {
          if ($body.find(".sc-list-item-spinner").length > 0) {
            cy.get(".sc-list-item-spinner", { timeout: 15000 }).should(
              "not.be.visible"
            );
          }
        });
        deleteAllItems();
      } else {
        cy.log("All items deleted");
      }
    });
  };
  deleteAllItems();
  cy.get("#sc-active-cart").contains(emptyMessage).should("be.visible");
});

// Find an item in a list by text or regex
Cypress.Commands.add("findItemByText", (text: string | RegExp) => {
  return cy.get('[role="list"]').contains('[role="listitem"]', text);
});

// Click a menu item by its text
Cypress.Commands.add("VerifyMenuItem", (menuItem: string) => {
  cy.get("a")
    .filter((index, element) => Cypress.$(element).text().trim() === menuItem)
    .should("be.visible")
    .and("have.text", menuItem)
    .and("have.attr", "href");
});

// Search and submit a query
Cypress.Commands.add(
  "searchAndSubmit",
  (query: string, selector = "#twotabsearchtextbox") => {
    cy.get(selector).should("be.visible").type(query).type("{enter}");
  }
);
