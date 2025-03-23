import { defineConfig } from "cypress";
import { addMatchImageSnapshotPlugin } from "@simonsmith/cypress-image-snapshot/plugin";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.amazon.com/", // Change to your target website
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Set to true if you need test recording
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    downloadsFolder: "cypress/downloads",
    specPattern: "cypress/e2e/**/*.cy.{ts,js}",
    supportFile: "cypress/support/e2e.ts",
    chromeWebSecurity: false, // Disable CORS security issues
    defaultCommandTimeout: 10000, // Increase timeout for stability
    experimentalStudio: true,
    waitForAnimations: true,
    modifyObstructiveCode: false, // Prevents Cypress from modifying app scripts
    pageLoadTimeout: 90000,
    retries: {
      runMode: 0, // Retries in `cypress run`
      openMode: 0, // No retries in `cypress open`
    },

    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on);
      require("@cypress/code-coverage/task")(on, config); // Enable code coverage
      return config;
    },
  },
});
