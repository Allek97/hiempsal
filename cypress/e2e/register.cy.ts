/// <reference types="Cypress" />
import { buildCustomer } from "../support/generate";

// NOTE: Make sure we can access authentification page from mobile and desktop
describe("access to authetification from homepage", () => {
    it("in mobile", () => {
        cy.viewport(390, 800);
        cy.visit("/");
        cy.findByTestId("profile-mobile").click({ force: true });
        cy.url().should("eq", `${Cypress.config().baseUrl}/authentification`);
    });

    it("in desktop", () => {
        cy.visit("/");
        cy.findByTestId("profile-desktop").click({ force: true });
        cy.url().should("eq", `${Cypress.config().baseUrl}/authentification`);
    });
});

describe.only("registration for desktop", () => {
    it("should register a new customer", () => {
        const customer = buildCustomer();

        cy.visit("/");
        cy.findByTestId("profile-desktop").click({ force: true });
        cy.findByTestId("signup-link").click();
        cy.findByText(/first name/i).type(customer.firstName);
        cy.findByTestId("signup-email").type(customer.email);
        cy.findByTestId("signup-password").type(customer.email);
        cy.findByPlaceholderText(/\+1 123 456 7890/i).type(customer.phone);

        cy.findByTestId("signup-submit").click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/account/overview`);
    });
});
