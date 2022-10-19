import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";
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
} from "../../elements/FormInputsStyle";

export interface Props {
    isDisplayed: boolean;
    openPWForgot: () => void;
    setIsLoging: Dispatch<SetStateAction<boolean>>;
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

const LoginForm: FC<Props> = ({ isDisplayed, openPWForgot, setIsLoging }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            setIsLoging(true);
            setIsLoading(true);
            const input: Login = {
                email,
                password,
            };
            await login(input);
            router.push("/account/overview");
        } catch (error) {
            setIsLoging(false);
            setIsLoading(false);
            if (error instanceof Error) {
                if (error.message.includes("Wrong email"))
                    setLoginError(error.message);
                else
                    setLoginError(
                        "sorry for the inconvenience, please try again"
                    );
            } else
                setLoginError("sorry for the inconvenience, please try again");
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
                        data-testid="login-email"
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
                        data-testid="login-password"
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
            <div className="flex items-end justify-between w-full ml-auto mb-2">
                {errors.email?.message && (
                    <ErrorForm role="alert" aria-label="invalid email">
                        <span className="mr-2 text-orange-red">
                            {errors.email?.message}
                        </span>
                    </ErrorForm>
                )}
                <ForgotPassword type="button" onClick={openPWForgot}>
                    Forgot password?
                </ForgotPassword>
            </div>
            <div className="w-full mt-8 ml-auto">
                <FormSubmitBtn
                    isHoverActive={false}
                    type="submit"
                    data-testid="login-submit"
                    disabled={isLoading}
                >
                    Login
                </FormSubmitBtn>
            </div>
            {loginError && (
                <ErrorForm
                    className="block mt-4"
                    role="alert"
                    aria-label="server error"
                >
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
