/* eslint-disable @typescript-eslint/no-non-null-assertion */
import faker from "@faker-js/faker";
import { customerCreateMutation } from "@framework/utils/mutations";
import { shopifyCustomerMock } from "cypress/fixtures/customer";
import { buildCustomer } from "./generate";

Cypress.Commands.add("createCustomer", (overrides) => {
    const customer = buildCustomer({ overrides });

    cy.request({
        url: Cypress.env("SHOPIFY_STORE_DOMAIN"),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": Cypress.env(
                "SHOPIFY_STOREFRONT_ACCESS_TOKEN"
            ),
        },
        body: {
            query: customerCreateMutation,
            variables: {
                input: {
                    ...customer,
                    phone: customer.phone.split(/[ -]+/).join(""),
                },
            },
        },
    }).then(() => customer);
});

Cypress.Commands.add("loginCustomer", () => {
    cy.intercept("POST", Cypress.env("SHOPIFY_STORE_DOMAIN"), (req) => {
        if (req.body.query.includes("customerAccessTokenCreate")) {
            req.reply({
                statusCode: 200,
                body: null,
            });
        }
    });

    cy.intercept("POST", Cypress.env("SHOPIFY_STORE_DOMAIN"), (req) => {
        if (req.body.query.includes("getCustomer")) {
            req.reply({
                statusCode: 200,
                body: shopifyCustomerMock,
            });
        }
    });

    cy.setCookie("shopify_customerToken", faker.datatype.string(8));
    cy.setCookie("shopify_checkoutId", faker.datatype.string(9));
    cy.setCookie("shopify_checkoutUrl", faker.datatype.string(10));
});

Cypress.Commands.add("assertAccount", () => {
    cy.url().should("eq", `${Cypress.config().baseUrl}/account/overview`);
});
Cypress.Commands.add("assertHome", () => {
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
});
Cypress.Commands.add("assertLoggedInAs", (customer) => {
    cy.getCookie("shopify_customerToken").should("exist");
    cy.getCookie("shopify_wishlistToken").should("exist");
    cy.getCookie("shopify_checkoutId").should("exist");
    cy.getCookie("shopify_checkoutUrl").should("exist");

    cy.findByText(RegExp(`${customer.firstName}`, "g"));
});
