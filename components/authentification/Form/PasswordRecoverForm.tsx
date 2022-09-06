import { motion } from "framer-motion";
import { FC, useState } from "react";
import { object, SchemaOf, string, ValidationError } from "yup";
import isEmailValidator from "validator/lib/isEmail";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useRecoverPassword from "@framework/auth/use-recover-password";

import {
    ErrorForm,
    ForgotPassword,
    FormInput,
    FormSubmitBtn,
    InputPlaceholder,
} from "../../elements/FormInputsStyle";

interface Props {
    isDisplayed: boolean;
    openPWForgot: () => void;
}

type RecoverForm = {
    email: string;
};

type SubmissionState = "success" | "error" | "neutral";

const formSchema: SchemaOf<RecoverForm> = object({
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
});

const PasswordRecoverForm: FC<Props> = ({ isDisplayed, openPWForgot }) => {
    const [email, setIsEmail] = useState<string>("");
    const [serverError, setServerError] = useState<string>("");
    const [submissionState, setSubmissionState] =
        useState<SubmissionState>("neutral");

    const methods = useForm<RecoverForm>({
        resolver: yupResolver(formSchema),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = methods;

    const recoverPassword = useRecoverPassword();
    async function onSubmit(): Promise<void> {
        try {
            setSubmissionState("neutral");
            const input: RecoverForm = {
                email: email,
            };

            await recoverPassword(input);
            setSubmissionState("success");
        } catch (error) {
            setSubmissionState("error");
            if (error instanceof Error) {
                setServerError(error.message);
            } else
                setServerError(
                    "Server error. Please try again in few moments."
                );
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={isDisplayed ? { display: "block" } : { display: "none" }}
        >
            <div className="w-full mb-2">
                <h3 className="mb-5 text-accents-9">
                    Please enter your email address. We will send you an email
                    to reset your password.
                </h3>
                <motion.label htmlFor="reset-email" className="relative">
                    <FormInput
                        {...register("email")}
                        id="reset-email"
                        type="email"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="reset-email"
                        value={email}
                        onChange={(e) => setIsEmail(e.target.value)}
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
            <div className="flex items-center w-full ml-auto mb-2">
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
                    Send reset email
                </FormSubmitBtn>
            </div>
            {submissionState !== "neutral" && (
                <ErrorForm className="block mt-4">
                    <span
                        style={{
                            color:
                                submissionState === "error"
                                    ? "var(--orange-red)"
                                    : "#4b9524",
                        }}
                    >
                        {submissionState === "error"
                            ? serverError
                            : "We've just sent you an email to reset your password."}
                    </span>
                </ErrorForm>
            )}
        </form>
    );
};

export default PasswordRecoverForm;
