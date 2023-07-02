import { buildCustomer } from "./generate";

export declare global {
    namespace Cypress {
        interface Chainable {
            createCustomer(
                value?: ReturnType<typeof buildCustomer>
            ): Chainable<ReturnType<typeof buildCustomer>>;
            loginCustomer(): Chainable<Element>;
            assertAccount(): Chainable<Element>;
            assertHome(): Chainable<Element>;
            assertLoggedInAs(
                customer: ReturnType<typeof buildCustomer>
            ): Chainable<Element>;
        }
    }
}
