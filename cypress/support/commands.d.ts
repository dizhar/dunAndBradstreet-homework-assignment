/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Navigates to the Amazon homepage and clicks the logo if visible.
     * @example cy.navigateToHome()
     */
    navigateToHome(): Chainable<void>;

    /**
     * Empties the cart by recursively deleting all items and verifies the empty message.
     * @param emptyMessage - The expected message when the cart is empty
     * @example cy.emptyCart("Your Amazon Cart is empty")
     */
    emptyCart(emptyMessage: string): Chainable<void>;

    /**
     * Finds an item in a list by matching text or regex.
     * @param text - The text or regex to match against the item
     * @example cy.findItemByText(/Bostitch/)
     */
    findItemByText(text: string | RegExp): Chainable<JQuery<HTMLElement>>;

    /**
     * Clicks a menu item by its text content.
     * @param menuItem - The text of the menu item to click
     * @example cy.clickMenuItem("Customer Service")
     */
    VerifyMenuItem(menuItem: string): Chainable<void>;

    /**
     * Types a search query into a specified input and submits it.
     * @param query - The search query to type
     * @param selector - The input selector (defaults to "#twotabsearchtextbox")
     * @example cy.searchAndSubmit("where is my stuff", "#hubHelpSearchInput")
     */
    searchAndSubmit(query: string, selector?: string): Chainable<void>;
  }
}
