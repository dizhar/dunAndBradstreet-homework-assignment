Here's your updated **README.md** with the **Approach Used in the Test** section added:

---

# MealTicket Homework Assignment

## Project Overview

This project contains Cypress automated tests for booking a restaurant on the Ontopo website. The test suite includes:

- **Standard Restaurant Booking**
- **Special Offer Booking via Happy Hour**

## Prerequisites

Ensure you have the following installed:

- **Node.js** (Recommended: v18+)
- **npm** (Comes with Node.js)
- **Cypress** (Installed via `package.json`)

## Installation

Install dependencies:

```sh
npm install
```

## Running Tests

### Open Cypress UI

To open Cypress in interactive mode:

```sh
npm start
```

### Run Tests in Headless Mode

#### Run on Chrome

```sh
npm run test:chrome
```

#### Run on Electron

```sh
npm run test:electron
```

#### Run All Tests on Available Browsers

```sh
npm run test:all
```

## Approach Used in the Test

✅ **Data-Driven Testing**

- Uses `bookingData.json` to store test inputs dynamically via `cy.fixture()`, making tests scalable and adaptable.

✅ **Modular Commands**

- Custom Cypress commands (`selectCountry`, `selectCity`, `clickBookingButton`, `selectPeople`) improve readability and maintainability by reducing repetition.

✅ **Handling Dynamic Elements**

- Ensures elements are interactable before clicking using `.should("be.visible")`, `.should("not.be.disabled")`, and `.filter(":visible")`.
- Minimizes hardcoded waits (`cy.wait(500)`) by dynamically waiting for elements.

## Project Structure

```dunAndBradstreet-homework-assignment/
├── cypress/
│   ├── e2e/                                  # Test specifications
│   │   ├── amazon_customer_service_where_is_my_stuff_navigation.cy.ts
│   │   ├── amazon_shopping_cart.spec.cy.ts
│   ├── fixtures/                             # Test data
│   │   ├── amazon_customer_service_where_is_my_stuff_navigation.json
│   │   ├── simple_amazon_data.json
│   ├── snapshots/                            # Snapshot files
│   │   ├── amazon_customer_service_where_is_my_stuff_navigation.cy.ts/
│   │   │   ├── wheres-my-stuff-page.snap.png
│   ├── support/                              # Custom Cypress commands & configurations
│   │   ├── commands.ts
│   │   ├── e2e.ts
├── cypress.config.ts                         # Cypress configuration file
├── package.json                              # Project dependencies and scripts
├── tsconfig.json                             # TypeScript configuration
├── README.md                                 # Project documentation
```

## Cypress Best Practices

- **Use Custom Commands**: Abstract repetitive actions into Cypress commands (`cypress/support/commands.ts`).
- **Use Fixtures for Test Data**: Store reusable test data in `cypress/fixtures/bookingData.json`.
- **Ensure Stability**: Add proper assertions and waits (e.g., `cy.waitUntil()`).

## Troubleshooting

### Cypress Tests Not Running

If Cypress fails to start, try:

```sh
npx cypress verify
```

### Browser Not Found

Ensure the correct browsers are installed. To check available browsers:

```sh
npx cypress info
```

### Debugging

Run Cypress in interactive mode (`npm start`) and inspect errors in the browser console.

---

**Author:** Daniel Izhar
**License:** ISC
