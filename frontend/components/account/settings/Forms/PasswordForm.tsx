import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";

import useLogin from "@framework/auth/use-login";
import useCustomerUpdate from "@framework/customer/use-customer-update";
import { getCustomerToken } from "@framework/utils";

import { CartButton } from "@components/common/ProductPopup";
import {
    ErrorForm,
    FormInput,
    InputPlaceholder,
} from "@components/elements/FormInputsStyle";

import { PassowrdContainer } from "../Settings.styled";
import { useCustomerSettings } from "../context";

type ResetForm = {
    password: string;
    passwordConfirm: string;
};

const formSchema: SchemaOf<ResetForm> = object({
    password: string()
        .required("Your need to provide your current password")
        .min(8, "At least 8 characters for the new password"),
    passwordConfirm: string()
        .required("You need to submit a compatible password")
        .min(8, "At least 8 characters for the new password"),
});

interface Props {
    customerEmail: string;
}

const PasswordForm: FC<Props> = ({ customerEmail }) => {
    const methods = useForm<ResetForm>({
        resolver: yupResolver(formSchema),
    });
    const [passwordError, setPasswordError] = useState<string>("");
    const [loading, setIsloading] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string>("");

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = methods;

    const { currentPassword, newPassword, setCurrentPassword, setNewPassword } =
        useCustomerSettings();

    function timeout(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    const login = useLogin();
    const updateCustomer = useCustomerUpdate();
    async function onSubmit(): Promise<void> {
        try {
            setConfirm(false);
            setIsloading(true);
            setPasswordError("");
            setServerError("");

            await login({
                email: customerEmail,
                password: currentPassword,
            });

            await updateCustomer({
                customer: {
                    password: newPassword,
                },
                customerAccessToken: getCustomerToken()!,
            });

            setIsloading(false);
            setConfirm(true);
            await timeout(2000);
            setConfirm(false);
        } catch (error) {
            setConfirm(false);
            setIsloading(false);
            if (error instanceof Error) {
                if (error instanceof Error) {
                    if (error.message === "Wrong email or password")
                        setPasswordError(
                            "Wrong password for this account, please try again"
                        );
                    else setServerError(error.message);
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.passwordConfirm?.message && (
                <ErrorForm className="my-2 font-bold">
                    <span className="mr-auto text-orange-red">
                        {errors.passwordConfirm?.message}
                    </span>
                </ErrorForm>
            )}
            <PassowrdContainer>
                <div>
                    <motion.label
                        htmlFor="customer-password"
                        className="relative"
                    >
                        <FormInput
                            {...register("password")}
                            id="customer-password"
                            type="password"
                            required
                            placeholder=" "
                            aria-required
                            maxLength={150}
                            autoComplete="customer-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
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
                        <InputPlaceholder>Current Password</InputPlaceholder>
                    </motion.label>
                </div>
                <div>
                    <motion.label
                        htmlFor="customer-passwordConfirm"
                        className="relative"
                    >
                        <FormInput
                            {...register("passwordConfirm")}
                            id="customer-passwordConfirm"
                            type="password"
                            required
                            placeholder=" "
                            aria-required
                            maxLength={150}
                            autoComplete="customer-passwordConfirm"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                        <InputPlaceholder>New password</InputPlaceholder>
                    </motion.label>
                </div>
            </PassowrdContainer>
            <div className="w-1/2 mt-6 overflow-hidden">
                <CartButton
                    isLoading={loading}
                    preText={confirm ? "Updated!" : "Update Password"}
                    loadingText="Updating..."
                />
            </div>
            {passwordError && (
                <ErrorForm className="block mt-4">
                    <span
                        style={{
                            color: "var(--orange-red)",
                        }}
                    >
                        {passwordError}
                    </span>
                </ErrorForm>
            )}
            {serverError && (
                <ErrorForm className="block mt-4">
                    <span
                        style={{
                            color: "var(--orange-red)",
                        }}
                    >
                        {serverError}
                    </span>
                </ErrorForm>
            )}
        </form>
    );
};

export default PasswordForm;
