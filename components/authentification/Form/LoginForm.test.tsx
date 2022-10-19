/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import "whatwg-fetch";
import { build } from "@jackfranklin/test-data-bot";
import { faker } from "@faker-js/faker";
import { mockUseRouter, render, screen, waitFor } from "@tests/customRender";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";

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

test("Renders login form correctely", () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
        screen.getByRole("button", { name: /forgot password\?/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test("Can fill out form and send request to shopify storefront api to log in", async () => {
    const { mockRouter } = render(<LoginForm {...defaultProps} />);

    mockUseRouter.mockReturnValue({
        ...mockRouter,
    });

    const customerLogin = buildCustomerLogin();

    await userEvent.type(
        screen.getByLabelText(/email address/i),
        customerLogin.email
    );

    await userEvent.type(
        screen.getByLabelText(/password/i),
        customerLogin.password
    );

    const loginBtn = screen.getByRole("button", { name: /login/i });

    expect(loginBtn).not.toBeDisabled();

    await userEvent.click(loginBtn);

    expect(loginBtn).toBeDisabled();

    await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith("/account/overview");
    });

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
});

const errorLoginAction = async (customerLogin: {
    email: string;
    password: string;
}) => {
    await userEvent.type(
        screen.getByLabelText(/email address/i),
        customerLogin.email
    );

    await userEvent.type(
        screen.getByLabelText(/password/i),
        customerLogin.password
    );
    const loginBtn = screen.getByRole("button", { name: /login/i });

    await userEvent.click(loginBtn);
};

describe("Login errors", () => {
    const loginUnregistered = buildCustomerLogin({
        overrides: {
            email: faker.internet.email(
                undefined,
                undefined,
                "unregistered-customer.com"
            ),
        },
    });
    const loginInvalid = buildCustomerLogin({
        overrides: {
            email: faker.internet.email(undefined, undefined, "invalid-email"),
        },
    });
    const loginServerError = buildCustomerLogin({
        overrides: {
            email: faker.internet.email(
                undefined,
                undefined,
                "server-error.ca"
            ),
        },
    });

    test("Unregistered", async () => {
        render(<LoginForm {...defaultProps} />);

        await errorLoginAction(loginUnregistered);

        const serverErrorMsg = await screen.findByRole("alert", {
            name: /server error/i,
        });
        expect(serverErrorMsg).toBeInTheDocument();
    });

    test("wrong email format", async () => {
        render(<LoginForm {...defaultProps} />);
        await errorLoginAction(loginInvalid);

        const emailErrorMsg = await screen.findByRole("alert", {
            name: /invalid email/i,
        });
        expect(emailErrorMsg).toHaveTextContent(/please enter a valid email/i);
    });
    test("server error", async () => {
        render(<LoginForm {...defaultProps} />);
        await errorLoginAction(loginServerError);

        const serverErrorMsg = await screen.findByRole("alert", {
            name: /server error/i,
        });
        expect(serverErrorMsg).toHaveTextContent(
            /sorry for the inconvenience, please try again/i
        );
    });
});

test.only("Should not have any a11y errors", async () => {
    const { container } = render(<LoginForm {...defaultProps} />);

    const results = await axe(container.innerHTML);
    expect(results).toHaveNoViolations();
});
