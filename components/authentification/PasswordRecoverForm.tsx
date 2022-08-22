import { motion } from "framer-motion";
import { FC } from "react";
import {
    ForgotPassword,
    FormInput,
    FormSubmitBtn,
    InputPlaceholder,
} from "./Commun/Form.styled";

interface Props {
    isDisplayed: boolean;
    openPWForgot: () => void;
}

const PasswordRecoverForm: FC<Props> = ({ isDisplayed, openPWForgot }) => {
    return (
        <form style={isDisplayed ? { display: "block" } : { display: "none" }}>
            <div className="w-full mb-2">
                <h3 className="mb-5 text-accents-9">
                    Please enter your email address. We will send you an email
                    to reset your password.
                </h3>
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
            <div className="w-max ml-auto mb-2">
                <ForgotPassword type="button" onClick={openPWForgot}>
                    Forgot password?
                </ForgotPassword>
            </div>
            <div className="w-full mt-8 ml-auto">
                <FormSubmitBtn isHoverActive={false}>
                    Send reset email
                </FormSubmitBtn>
            </div>
        </form>
    );
};

export default PasswordRecoverForm;
