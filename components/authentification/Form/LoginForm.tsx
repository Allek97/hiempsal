import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "@framework/auth/use-login";

import {
    ErrorForm,
    ForgotPassword,
    FormInput,
    FormSubmitBtn,
    InputPlaceholder,
} from "../Commun/Form.styled";

interface Props {
    isDisplayed: boolean;
    openPWForgot: () => void;
}

type Login = {
    email: string;
    password: string;
};

const formSchema: SchemaOf<Login> = object({
    email: string()
        .email("Please enter a valid email address")
        .required("Email address is required"),

    password: string().required("Password is required"),
});

const LoginForm: FC<Props> = ({ isDisplayed, openPWForgot }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");

    const methods = useForm<Login>({
        resolver: yupResolver(formSchema),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = methods;

    const router = useRouter();
    const login = useLogin();
    async function onSubmit(): Promise<void> {
        try {
            setLoginError("");
            const input: Login = {
                email,
                password,
            };

            await login(input);
            router.push("/account/overview");
        } catch (error) {
            if (error instanceof Error) setLoginError(error.message);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={isDisplayed ? { display: "block" } : { display: "none" }}
        >
            <div className="w-full mb-2">
                <motion.label htmlFor="login-email" className="relative">
                    <FormInput
                        {...register("email")}
                        id="login-email"
                        type="email"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="login-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        {...register("password")}
                        id="login-password"
                        type="password"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
            <div className="w-max ml-auto mb-2">
                <ErrorForm>
                    <span className="mr-auto text-orange-red">
                        {errors.email?.message}
                    </span>
                </ErrorForm>
                <ForgotPassword type="button" onClick={openPWForgot}>
                    Forgot password?
                </ForgotPassword>
            </div>
            <div className="w-full mt-8 ml-auto">
                <FormSubmitBtn isHoverActive={false} type="submit">
                    Login
                </FormSubmitBtn>
            </div>
            {loginError && (
                <ErrorForm className="block mt-4">
                    <span
                        style={{
                            color: "var(--orange-red)",
                        }}
                    >
                        {loginError}
                    </span>
                </ErrorForm>
            )}
        </form>
    );
};

export default LoginForm;
