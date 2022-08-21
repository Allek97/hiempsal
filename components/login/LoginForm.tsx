import { motion } from "framer-motion";
import { FC } from "react";
import {
    ForgotPassword,
    FormInput,
    FormSubmitBtn,
    InputPlaceholder,
} from "./Commun/Form.styled";

interface Props {
    openPWForgot: () => void;
}

const LoginForm: FC<Props> = ({ openPWForgot }) => {
    return (
        <form>
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
                    />
                    <InputPlaceholder>Password</InputPlaceholder>
                </motion.label>
            </div>
            <div className="w-max ml-auto mb-2">
                <ForgotPassword type="button" onClick={openPWForgot}>
                    Forgot password?
                </ForgotPassword>
            </div>
            <div className="w-full mt-8 ml-auto">
                <FormSubmitBtn isHoverActive={false}>Login</FormSubmitBtn>
            </div>
        </form>
    );
};

export default LoginForm;
