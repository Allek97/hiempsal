import {
    FormInput,
    InputPlaceholder,
} from "@components/elements/FormInputsStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { FC } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import { CustomerUpdate } from "../Settings";
import { PassowrdContainer } from "../Settings.styled";
import { useCustomerSettings } from "./context";

type ResetForm = {
    password: string;
    passwordConfirm: string;
};

const formSchema: SchemaOf<ResetForm> = object({
    password: string()
        .required("Password is required")
        .min(8, "At least 8 characters"),
    passwordConfirm: string()
        .required("You need to submit a compatible password")
        .test("passwords-match", "Passwords don't match", function (value) {
            return this.parent.password === value;
        }),
});

const PasswordForm: FC = () => {
    const methods = useForm<ResetForm>({
        resolver: yupResolver(formSchema),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = methods;

    const { password, passwordConfirm, setPassword, setPasswordConfirm } =
        useCustomerSettings();

    return (
        <form>
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
                        <InputPlaceholder>
                            New password (optional)
                        </InputPlaceholder>
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
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
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
                        <InputPlaceholder>
                            Re-enter new password (optional)
                        </InputPlaceholder>
                    </motion.label>
                </div>
            </PassowrdContainer>
        </form>
    );
};

export default PasswordForm;
