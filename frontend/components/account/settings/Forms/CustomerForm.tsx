import {
    ErrorForm,
    FormInput,
    InputPlaceholder,
    PhoneInputContainer,
} from "@components/elements/FormInputsStyle";
import { motion } from "framer-motion";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { useCustomerSettings } from "../context";
import { CustomerUpdateInfo } from "./CustomerUpdateInfo.type";

const CustomerForm: FC = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CustomerUpdateInfo>();

    const {
        email,
        firstName,
        lastName,
        phone,
        phoneError,
        setEmail,
        setFirstName,
        setLastName,
        setPhone,
    } = useCustomerSettings();

    return (
        <div className="mb-24">
            <div className="w-full mb-2">
                {errors.email?.message && (
                    <ErrorForm className="my-2 font-bold">
                        <span className="mr-auto text-orange-red">
                            {errors.email?.message}
                        </span>
                    </ErrorForm>
                )}
                <motion.label htmlFor="customer-email" className="relative">
                    <FormInput
                        {...register("email")}
                        id="customer-email"
                        type="email"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="customer-email"
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
                {errors.firstName?.message && (
                    <ErrorForm className="my-2 font-bold">
                        <span className="mr-auto text-orange-red">
                            {errors.firstName?.message}
                        </span>
                    </ErrorForm>
                )}
                <motion.label htmlFor="customer-firstName" className="relative">
                    <FormInput
                        {...register("firstName")}
                        id="customer-firstName"
                        type="text"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="customer-firstName"
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
                {errors.lastName?.message && (
                    <ErrorForm className="my-2 font-bold">
                        <span className="mr-auto text-orange-red">
                            {errors.lastName?.message}
                        </span>
                    </ErrorForm>
                )}
                <motion.label htmlFor="customer-lastName" className="relative">
                    <FormInput
                        {...register("lastName")}
                        id="customer-lastName"
                        type="text"
                        placeholder=" "
                        maxLength={150}
                        autoComplete="customer-lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                    <InputPlaceholder>Last Name (optional)</InputPlaceholder>
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
                <motion.label htmlFor="customer-phone" className="relative">
                    <PhoneInputContainer>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange } }) => (
                                <PhoneInput
                                    {...register("phone")}
                                    country="ca"
                                    placeholder="+1 123 456 7890"
                                    value={`+${phone}`}
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
        </div>
    );
};

export default CustomerForm;
