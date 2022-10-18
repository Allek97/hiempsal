import { build } from "@jackfranklin/test-data-bot";
import { faker } from "@faker-js/faker";
import { render, screen } from "@tests/customRender";
import userEvent from "@testing-library/user-event";
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

    userEvent.type(
        screen.getByLabelText(/email address/i),
        customerLogin.email
    );
    userEvent.type(screen.getByLabelText(/password/i), customerLogin.password);
});
