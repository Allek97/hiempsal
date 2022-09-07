/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import isEmailValidator from "validator/lib/isEmail";

import useCustomer from "@framework/customer/use-customer";

import { object, SchemaOf, string, ValidationError } from "yup";

import { Account } from "../commun";
import { AddressForm, CustomerForm, PasswordForm } from "./Forms";

import { Container, CustomerAvatar } from "./Settings.styled";
import { SettingsProvider } from "./Forms/context";

export type CustomerUpdate = {
    email: string;
    firstName: string;
    lastName?: string;
    phone: string;
    address1?: string;
    city?: string;
    company?: string;
    country?: string;
    zip?: string;
    password?: string;
    passwordConfirm?: string;
};

const formSchema: SchemaOf<CustomerUpdate> = object({
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
    phone: string().required("You need to enter a phone number"),
    lastName: string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(40),
    address1: string(),
    city: string(),
    company: string(),
    country: string(),
    zip: string(),
    password: string().min(8, "At least 8 characters"),
    passwordConfirm: string().test(
        "passwords-match",
        "Passwords don't match",
        function (value) {
            return this.parent.password === value;
        }
    ),
});

const Settings: FC = () => {
    const { data: customer } = useCustomer();

    const methods = useForm<CustomerUpdate>({
        resolver: yupResolver(formSchema),
    });

    const { handleSubmit } = methods;

    async function onSubmit(): Promise<void> {
        try {
            console.log("mutating");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Account>
            <Container>
                <div className="flex flex-col items-center w-max mb-10 lg:flex-row">
                    <CustomerAvatar>IL</CustomerAvatar>
                    <Link href="/account/overview">
                        <a className="mt-3 text-xs xl:text-sm">
                            <span className="underline mr-0.5">
                                Ilias's account
                            </span>
                            <span
                                className="xl:text-sm"
                                style={{ fontSize: "9px" }}
                            >
                                &#8599;
                            </span>
                        </a>
                    </Link>
                </div>

                <SettingsProvider>
                    <FormProvider {...methods}>
                        <form
                            className="w-full"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <CustomerForm />
                            <div className="mb-24">
                                <h3 className="mb-4 lg:mb-6">
                                    Shipping address
                                </h3>
                                <AddressForm />
                            </div>

                            <div>
                                <h3 className="mb-4 lg:mb-6">
                                    Update password
                                </h3>
                                <PasswordForm />
                            </div>
                        </form>
                    </FormProvider>
                </SettingsProvider>
            </Container>
        </Account>
    );
};

export default Settings;
