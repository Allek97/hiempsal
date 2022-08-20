/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import { useReducer } from "react";
import { HiArrowRight } from "react-icons/hi";
import {
    Main,
    LoginForm,
    UtilityBtn,
    FormInput,
    InputPlaceholder,
    FormLabel,
    ForgotPassword,
    FormSubmitBtn,
    ImageWrapper,
} from "./Login.styled";

type State = {
    isLoginOpen: boolean;
    isSignupOpen: boolean;
    isForgotPWOpen: boolean;
};

const initialState: State = {
    isLoginOpen: true,
    isSignupOpen: false,
    isForgotPWOpen: false,
};

type Action = { type: "OPEN_LOGIN" | "OPEN_SIGNUP" | "OPEN_FORGOT_PW" };

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "OPEN_LOGIN":
            return {
                isLoginOpen: true,
                isSignupOpen: false,
                isForgotPWOpen: false,
            };
        case "OPEN_SIGNUP":
            return {
                isSignupOpen: true,
                isLoginOpen: false,
                isForgotPWOpen: false,
            };
        case "OPEN_FORGOT_PW":
            return {
                isForgotPWOpen: true,
                isLoginOpen: false,
                isSignupOpen: false,
            };

        default:
            return { ...state };
    }
}

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { isLoginOpen, isSignupOpen, isForgotPWOpen } = state;

    const openSignin = (): void => dispatch({ type: "OPEN_LOGIN" });
    const openSignup = (): void => dispatch({ type: "OPEN_SIGNUP" });
    const openPWForgot = (): void => dispatch({ type: "OPEN_FORGOT_PW" });

    return (
        <Main>
            <ImageWrapper>
                <Image src="" />
            </ImageWrapper>
            <LoginForm>
                <h1>Account</h1>
                <div className="flex mb-4">
                    <UtilityBtn
                        type="button"
                        $isActive={isLoginOpen}
                        onClick={openSignin}
                    >
                        <HiArrowRight className="mr-1.5" />
                        <span>Login</span>
                    </UtilityBtn>
                    <UtilityBtn
                        type="button"
                        $isActive={isSignupOpen}
                        onClick={openSignup}
                    >
                        <HiArrowRight className="mr-1.5" />
                        <span>Sign up</span>
                    </UtilityBtn>
                </div>
                <div className="w-full mb-2">
                    <FormLabel htmlFor="login-email">
                        <FormInput
                            id="login-email"
                            type="email"
                            aria-required
                            maxLength={150}
                            autoComplete="login-email"
                            whileHover={{
                                backgroundColor: "#f0f0f0",
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                transition: {
                                    duration: 0.15,
                                    ease: "linear",
                                },
                            }}
                        />
                        <InputPlaceholder>Email Address</InputPlaceholder>
                    </FormLabel>
                </div>
                <div className="w-full mb-2">
                    <FormLabel htmlFor="login-email">
                        <FormInput
                            id="login-email"
                            type="email"
                            aria-required
                            maxLength={150}
                            autoComplete="login-email"
                            whileHover={{
                                backgroundColor: "#f0f0f0",
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                transition: {
                                    duration: 0.15,
                                    ease: "linear",
                                },
                            }}
                        />
                        <InputPlaceholder>Email Address</InputPlaceholder>
                    </FormLabel>
                </div>
                <div className="w-full mb-2">
                    <FormLabel htmlFor="login-email">
                        <FormInput
                            id="login-email"
                            type="email"
                            aria-required
                            maxLength={150}
                            autoComplete="login-email"
                            whileHover={{
                                backgroundColor: "#f0f0f0",
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                transition: {
                                    duration: 0.15,
                                    ease: "linear",
                                },
                            }}
                        />
                        <InputPlaceholder>Email Address</InputPlaceholder>
                    </FormLabel>
                </div>
                <div className="w-full mb-2">
                    <FormLabel htmlFor="login-password">
                        <FormInput
                            id="login-password"
                            type="password"
                            aria-required
                            maxLength={150}
                            autoComplete="login-password"
                            whileHover={{
                                backgroundColor: "#f0f0f0",
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                transition: {
                                    duration: 0.15,
                                    ease: "linear",
                                },
                            }}
                        />
                        <InputPlaceholder>Password</InputPlaceholder>
                    </FormLabel>
                </div>
                <div className="w-max ml-auto mb-2">
                    <ForgotPassword type="button" onClick={openPWForgot}>
                        Forgot password?
                    </ForgotPassword>
                </div>
                <div className="w-full mt-8 ml-auto">
                    <FormSubmitBtn isHoverActive={false}>Login</FormSubmitBtn>
                </div>
            </LoginForm>
        </Main>
    );
};

export default Login;
