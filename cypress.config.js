/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

/// <reference types="Cypress" />

const { defineConfig } = require("cypress");

module.exports = defineConfig({
    viewportHeight: 1000,
    viewportWidth: 1400,
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require("./cypress/plugins/index.ts")(on, config);
        },
        baseUrl: "http://localhost:1000",
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        defaultCommandTimeout: 12000,
    },
});
