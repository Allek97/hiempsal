import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, SchemaOf, string, ValidationError } from "yup";
import isEmailValidator from "validator/lib/isEmail";
import useSignup from "@framework/auth/use-signup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import {
    ForgotPassword,
    FormInput,
    PhoneInputContainer,
    FormSubmitBtn,
    InputPlaceholder,
    ErrorForm,
} from "@components/elements/FormInputsStyle";

interface Props {
    isDisplayed: boolean;
    openPWForgot: () => void;
    setIsSigningUp: Dispatch<SetStateAction<boolean>>;
}

type Signup = {
    firstName: string;
    email: string;
    password: string;
    phone: string;
};

const formSchema: SchemaOf<Signup> = object({
    firstName: string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(40)
        .required("You need to provide a valid first name"),
    email: string()
        .email("Please enter a valid email address")
        .required("Email address is required")
        .test(
            "is-valid",
            () => `Please enter a valid email address`,
            (value) =>
                value
                    ? isEmailValidator(value)
                    : new ValidationError("Invalid value")
        ),
    password: string()
        .required("Password is required")
        .min(8, "At least 8 characters"),
    phone: string().required("You need to enter a phone number"),
});

const SignupForm: FC<Props> = ({
    isDisplayed,
    openPWForgot,
    setIsSigningUp,
}) => {
    const [firstName, setFirstName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");
    const [serverError, setServerError] = useState<string>("");

    const methods = useForm<Signup>({
        resolver: yupResolver(formSchema),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = methods;

    const router = useRouter();
    const signup = useSignup();
    async function onSubmit(): Promise<void> {
        try {
            setServerError("");
            setPhoneError("");
            setIsSigningUp(true);
            const input: Signup = {
                firstName,
                email,
                password,
                phone,
            };
            await signup(input);
            setServerError("");
            setPhoneError("");
            router.push("/account/overview");
        } catch (error) {
            setIsSigningUp(false);
            if (error instanceof Error) {
                if (error.message.includes("phone"))
                    setPhoneError("Phone number is not valid");
                else setServerError("Server error. Please try again!");
            } else setServerError("Server error. Please try again!");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={isDisplayed ? { display: "block" } : { display: "none" }}
        >
            <div className="w-full mb-2">
                {errors.firstName?.message && (
                    <ErrorForm className="my-2 font-bold">
                        <span className="mr-auto text-orange-red">
                            {errors.firstName?.message}
                        </span>
                    </ErrorForm>
                )}

                <motion.label htmlFor="signup-firstName" className="relative">
                    <FormInput
                        {...register("firstName")}
                        id="signup-firstName"
                        type="text"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="signup-firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
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
                {errors.email?.message && (
                    <ErrorForm className="my-2 font-bold">
                        <span className="mr-auto text-orange-red">
                            {errors.email?.message}
                        </span>
                    </ErrorForm>
                )}

                <motion.label htmlFor="signup-email" className="relative">
                    <FormInput
                        {...register("email")}
                        id="signup-email"
                        data-testid="signup-email"
                        type="email"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="signup-email"
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
                {errors.password?.message && (
                    <ErrorForm className="my-2 font-bold">
                        <span className="mr-auto text-orange-red">
                            {errors.password?.message}
                        </span>
                    </ErrorForm>
                )}
                <motion.label htmlFor="signup-password" className="relative">
                    <FormInput
                        {...register("password")}
                        id="signup-password"
                        data-testid="signup-password"
                        type="password"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="signup-password"
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
            <div className="w-full mb-2">
                {(phoneError || errors.phone?.message) && (
                    <ErrorForm className="my-2 font-bold">
                        <span className="mr-auto text-orange-red">
                            {phoneError || errors.phone?.message}
                        </span>
                    </ErrorForm>
                )}

                <motion.label htmlFor="signup-phone" className="relative">
                    <PhoneInputContainer>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <PhoneInput
                                    {...register("phone")}
                                    placeholder="+1 123 456 7890"
                                    value={phone ? `+${phone}` : ""}
                                    onChange={(e) => {
                                        onChange("+" + e);
                                        setPhone("+" + e);
                                    }}
                                />
                            )}
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
                <FormSubmitBtn
                    isHoverActive={false}
                    type="submit"
                    data-testid="signup-submit"
                >
                    Sign up
                </FormSubmitBtn>
            </div>
            {serverError && (
                <ErrorForm className="mt-4">
                    <span className="mr-auto text-orange-red">
                        {serverError}
                    </span>
                </ErrorForm>
            )}
        </form>
    );
};

export default SignupForm;
