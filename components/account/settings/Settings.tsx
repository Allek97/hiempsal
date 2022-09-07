/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import isEmailValidator from "validator/lib/isEmail";

import useCustomer from "@framework/customer/use-customer";

import { Maybe } from "@framework/types/commun";
import useCustomerCreateAddress, {
    CustomerAddressCreate,
} from "@framework/customer/use-customer-create-address";
import { object, SchemaOf, string, ValidationError } from "yup";

import { getCustomerToken } from "@framework/utils";
import useCustomerUpdateAddress, {
    CustomerAddressUpdate,
} from "@framework/customer/use-customer-update-address";
import useCustomerUpdateDefaultAddress from "@framework/customer/use-customer-update-default-address";
import useCustomerUpdate, {
    CustomerUpdate,
} from "@framework/customer/use-customer-update";

import { ErrorForm } from "@components/elements/FormInputsStyle";
import { CartButton } from "@components/common/ProductPopup";
import { Account } from "../commun";
import { AddressForm, CustomerForm, PasswordForm } from "./Forms";

import { Container, CustomerAvatar } from "./Settings.styled";
import { useCustomerSettings } from "./context";

export type CustomerUpdateInfo = {
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

const formSchema: SchemaOf<CustomerUpdateInfo> = object({
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
    const [loading, setIsloading] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string>("");

    const methods = useForm<CustomerUpdateInfo>({
        resolver: yupResolver(formSchema),
    });

    const { handleSubmit, setValue } = methods;

    const {
        email,
        firstName,
        lastName,
        phone,
        address1,
        city,
        company,
        country,
        zip,
        setAddress1,
        setCity,
        setCompany,
        setCountry,
        setPhoneError,
        setZip,
        setEmail,
        setFirstName,
        setLastName,
        setPhone,
    } = useCustomerSettings();

    useEffect(() => {
        setValue("email", customer?.email ?? "");
        setValue("firstName", customer?.firstName ?? "");
        setValue("lastName", customer?.lastName ?? "");
        setValue("phone", customer?.phone ?? "");
        setValue("address1", customer?.defaultAddress?.address1 ?? "");
        setValue("city", customer?.defaultAddress?.city ?? "");
        setValue("company", customer?.defaultAddress?.company ?? "");
        setValue("country", customer?.defaultAddress?.country ?? "");
        setValue("zip", customer?.defaultAddress?.zip ?? "");

        setEmail(customer?.email ?? "");
        setFirstName(customer?.firstName ?? "");
        setLastName(customer?.lastName ?? "");
        setPhone(customer?.phone ?? "");
        setAddress1(customer?.defaultAddress?.address1 ?? "");
        setCity(customer?.defaultAddress?.city ?? "");
        setCompany(customer?.defaultAddress?.company ?? "");
        setCountry(customer?.defaultAddress?.country ?? "");
        setZip(customer?.defaultAddress?.zip ?? "");

        return () => {};
    }, [
        customer,
        setAddress1,
        setCity,
        setCompany,
        setCountry,
        setEmail,
        setFirstName,
        setLastName,
        setPhone,
        setValue,
        setZip,
    ]);

    function timeout(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    const updateCustomer = useCustomerUpdate();
    const createAddress = useCustomerCreateAddress();
    const updateAddress = useCustomerUpdateAddress();
    const updateDefaulAddress = useCustomerUpdateDefaultAddress();
    async function onSubmit(): Promise<void> {
        try {
            setConfirm(false);
            setIsloading(true);
            setPhoneError("");
            setServerError("");

            const customerAccessToken = getCustomerToken()!;
            const customerInput: CustomerUpdate = {
                customer: {
                    email,
                    firstName,
                    lastName,
                    phone,
                },
                customerAccessToken,
            };
            let defaultAddressId: Maybe<string> = customer?.defaultAddress?.id;
            const newAddress = {
                address1,
                city,
                company,
                country,
                zip,
            };
            if (!defaultAddressId) {
                const addressInput: CustomerAddressCreate = {
                    address: newAddress,
                    customerAccessToken,
                };
                const res = await createAddress(addressInput);
                defaultAddressId = res.addressId;
            } else {
                const addressInput: CustomerAddressUpdate = {
                    address: newAddress,
                    customerAccessToken,
                    id: defaultAddressId,
                };
                await updateAddress(addressInput);
            }

            await updateDefaulAddress({
                addressId: defaultAddressId,
                customerAccessToken,
            });

            await updateCustomer(customerInput);

            setIsloading(false);
            setConfirm(true);
            await timeout(2000);
            setConfirm(false);
        } catch (err) {
            setConfirm(false);
            setIsloading(false);
            if (err instanceof Error) {
                console.log(err.message);
                if (err.message.includes("phone")) {
                    setPhoneError("Phone number is not valid");
                } else setServerError(err.message);
            }
        }
    }

    return (
        <Account>
            <Container>
                <div className="flex flex-col items-center w-max mb-10 lg:flex-row">
                    <CustomerAvatar>
                        {customer?.firstName?.substring(0, 2) ?? "HP"}
                    </CustomerAvatar>
                    <Link href="/account/overview">
                        <a className="mt-3 text-xs xl:text-sm">
                            <span className="underline mr-0.5">
                                {customer?.firstName
                                    ? customer.firstName
                                          .charAt(0)
                                          .toUpperCase() +
                                      customer.firstName.slice(1)
                                    : "Your"}
                                {customer?.firstName && "'s"} account
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

                <FormProvider {...methods}>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <CustomerForm />
                        <div className="mb-24">
                            <h3 className="mb-4 lg:mb-6">Shipping address</h3>
                            <AddressForm />
                            <div className="w-1/2 mt-8 overflow-hidden">
                                <CartButton
                                    isLoading={loading}
                                    preText={confirm ? "Saved!" : "Save"}
                                    loadingText="Saving..."
                                />
                            </div>
                            {serverError && (
                                <ErrorForm className="mt-4">
                                    <span className="mr-auto text-orange-red">
                                        {serverError}
                                    </span>
                                </ErrorForm>
                            )}
                        </div>
                    </form>
                    <div>
                        <h3 className="mb-4 lg:mb-6">Update password</h3>
                        <PasswordForm customerEmail={customer?.email ?? ""} />
                    </div>
                </FormProvider>
            </Container>
        </Account>
    );
};

export default Settings;
