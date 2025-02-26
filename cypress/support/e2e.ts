// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import custom commands
import "./commands";

// Import Testing Library support
import "@testing-library/cypress/add-commands";

// Ensure Cypress does not fail tests on uncaught exceptions
Cypress.on("uncaught:exception", (err) => {
  console.error("Uncaught Exception:", err);
  return false; // Prevent test failures from uncaught errors
});

// Run before each test suite
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => win.sessionStorage.clear());
  cy.log("Starting a new test...");
});

// Run after each test suite
afterEach(() => {
  cy.log("Test completed - Cleaning up");
});

import "cypress-wait-until";
