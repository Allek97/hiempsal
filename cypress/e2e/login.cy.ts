describe("login", () => {
    it("should login an existing customer", () => {
        cy.createCustomer().then((customer) => {
            cy.visit("/");
            cy.findByTestId("profile-desktop").click({ force: true });
            cy.findByTestId("login-email").type(customer.email);
            cy.findByTestId("login-password").type(customer.password);
            cy.findByTestId("login-submit").click();

            cy.assertAccount();
            cy.assertLoggedInAs(customer);
        });
    });
});

export {};
