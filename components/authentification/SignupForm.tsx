import { motion } from "framer-motion";
import { FC } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import {
    ForgotPassword,
    FormInput,
    PhoneInputContainer,
    FormSubmitBtn,
    InputPlaceholder,
} from "./Commun/Form.styled";

interface Props {
    isDisplayed: boolean;
    openPWForgot: () => void;
}

const SignupForm: FC<Props> = ({ isDisplayed, openPWForgot }) => {
    return (
        <form style={isDisplayed ? { display: "block" } : { display: "none" }}>
            <div className="w-full mb-2">
                <motion.label htmlFor="login-firstName" className="relative">
                    <FormInput
                        id="login-firstName"
                        type="text"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="login-firstName"
                        whileHover={{
                            backgroundColor: "#f0f0f0",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            transition: {
                                duration: 0.15,
                                ease: "linear",
                            },
                        }}
                        whileFocus={{
                            backgroundColor: "#f0f0f0",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            transition: {
                                duration: 0.15,
                                ease: "linear",
                            },
                        }}
                    />
                    <InputPlaceholder>First Name</InputPlaceholder>
                </motion.label>
            </div>
            <div className="w-full mb-2">
                <motion.label htmlFor="login-email" className="relative">
                    <FormInput
                        id="login-email"
                        type="email"
                        required
                        placeholder=" "
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
                        whileFocus={{
                            backgroundColor: "#f0f0f0",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            transition: {
                                duration: 0.15,
                                ease: "linear",
                            },
                        }}
                    />
                    <InputPlaceholder>Email Address</InputPlaceholder>
                </motion.label>
            </div>
            <div className="w-full mb-2">
                <motion.label htmlFor="login-password" className="relative">
                    <FormInput
                        id="login-password"
                        type="password"
                        required
                        placeholder=" "
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
                        whileFocus={{
                            backgroundColor: "#f0f0f0",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            transition: {
                                duration: 0.15,
                                ease: "linear",
                            },
                        }}
                    />
                    <InputPlaceholder>Password</InputPlaceholder>
                </motion.label>
            </div>
            <div className="w-full mb-2">
                <motion.label htmlFor="login-phone" className="relative">
                    <PhoneInputContainer>
                        <PhoneInput
                            country="ca"
                            placeholder="+1 438 998 0902"
                        />
                    </PhoneInputContainer>
                </motion.label>
            </div>
            <div className="w-max ml-auto mb-2">
                <ForgotPassword type="button" onClick={openPWForgot}>
                    Forgot password?
                </ForgotPassword>
            </div>
            <div className="w-full mt-8 ml-auto">
                <FormSubmitBtn isHoverActive={false}>Sign up</FormSubmitBtn>
            </div>
        </form>
    );
};

export default SignupForm;
