/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import "whatwg-fetch";
import { build } from "@jackfranklin/test-data-bot";
import { faker } from "@faker-js/faker";
import { render, screen, waitFor } from "@tests/customRender";
import userEvent from "@testing-library/user-event";
import { authServer } from "@mocks/api";
import LoginForm, { Props } from "./LoginForm";

const defaultProps: Props = {
    isDisplayed: true,
    openPWForgot: () => {},
    setIsLoging: () => {},
};

const buildCustomerLogin = build("CustomerLogin", {
    fields: {
        email: faker.internet.email(),
        password: faker.internet.password(8),
    },
});

beforeAll(() => authServer.listen({ onUnhandledRequest: "error" }));
afterAll(() => authServer.close());
afterEach(() => authServer.resetHandlers());

authServer.printHandlers();

test("renders login form correctely", () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
        screen.getByRole("button", { name: /forgot password\?/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test.only("Can fill out login form and send request to shopify storefront api", () => {
    render(<LoginForm {...defaultProps} />);
    const customerLogin = buildCustomerLogin();
    console.log(customerLogin.email);

    userEvent.type(
        screen.getByLabelText(/email address/i),
        customerLogin.email
    );
    userEvent.type(screen.getByLabelText(/password/i), customerLogin.password);

    const loginBtn = screen.getByRole("button", { name: /login/i });

    expect(loginBtn).not.toBeDisabled();

    userEvent.click(loginBtn);

    screen.debug();

    // await waitFor(() => expect(loginBtn).toBeDisabled());
});
