describe("logout", () => {
    it("should logout an existing customer", () => {
        cy.createCustomer().then((customer) => {
            cy.visit("/authentification");
            cy.findByTestId("login-email").type(customer.email);
            cy.findByTestId("login-password").type(customer.password);
            cy.findByTestId("login-submit").click();

            cy.findByText(/logout/i).click();
            cy.assertHome();
        });
    });
});
