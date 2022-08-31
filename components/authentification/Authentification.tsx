import Image from "next/image";
import { FC, useReducer } from "react";
import { HiArrowRight } from "react-icons/hi";
import {
    Main,
    AccountContainer,
    UtilityBtn,
    ImageWrapper,
} from "./Authentification.styled";
import { LoginForm, SignupForm, PasswordRecoverForm } from "./Form";

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

const Authentification: FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { isLoginOpen, isSignupOpen, isForgotPWOpen } = state;

    const openSignin = (): void => dispatch({ type: "OPEN_LOGIN" });
    const openSignup = (): void => dispatch({ type: "OPEN_SIGNUP" });
    const openPWForgot = (): void => dispatch({ type: "OPEN_FORGOT_PW" });

    return (
        <Main>
            <ImageWrapper>
                <Image
                    src="/images/amazigh-art-2.jpg"
                    alt="Amazigh art"
                    layout="fill"
                />
            </ImageWrapper>
            <AccountContainer>
                <h1>Account</h1>
                <div className="flex mb-4 lg:mb-10">
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
                <LoginForm
                    isDisplayed={isLoginOpen}
                    openPWForgot={openPWForgot}
                />
                <SignupForm
                    isDisplayed={isSignupOpen}
                    openPWForgot={openPWForgot}
                />
                <PasswordRecoverForm
                    isDisplayed={isForgotPWOpen}
                    openPWForgot={openPWForgot}
                />
            </AccountContainer>
        </Main>
    );
};

export default Authentification;