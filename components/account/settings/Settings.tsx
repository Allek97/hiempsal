/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { parsePhoneNumber } from "awesome-phonenumber";

import useCustomer from "@framework/customer/use-customer";
import {
    CountryPlaceholder,
    CountryValue,
    FormCountryContainer,
    FormInput,
    FormSelectCountry,
    InputPlaceholder,
    PhoneInputContainer,
} from "@components/elements/FormInputsStyle";
import { Plus } from "@components/icons";
import PhoneInput from "react-phone-input-2";

import { Account } from "../commun";
import {
    CityZipContainer,
    Container,
    CustomerAvatar,
    PassowrdContainer,
    PlusCountry,
} from "./Settings.styled";
import CountryOptions from "./CountryOptions";

const Settings: FC = () => {
    const { data: customer } = useCustomer();

    const [country, setCountry] = useState<string>("");

    return (
        <Account>
            <Container>
                <div className="flex flex-col items-center mb-10">
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
                <form className="w-full">
                    <div className="mb-24">
                        <div className="w-full mb-2">
                            <motion.label
                                htmlFor="customer-email"
                                className="relative"
                            >
                                <FormInput
                                    id="customer-email"
                                    type="email"
                                    required
                                    placeholder=" "
                                    aria-required
                                    maxLength={150}
                                    autoComplete="customer-email"
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
                                    Email Address
                                </InputPlaceholder>
                            </motion.label>
                        </div>
                        <div className="w-full mb-2">
                            <motion.label
                                htmlFor="customer-firstName"
                                className="relative"
                            >
                                <FormInput
                                    id="customer-firstName"
                                    type="text"
                                    required
                                    placeholder=" "
                                    aria-required
                                    maxLength={150}
                                    autoComplete="customer-firstName"
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
                            <motion.label
                                htmlFor="customer-lastName"
                                className="relative"
                            >
                                <FormInput
                                    id="customer-lastName"
                                    type="text"
                                    required
                                    placeholder=" "
                                    aria-required
                                    maxLength={150}
                                    autoComplete="customer-lastName"
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
                                    Last Name (optional)
                                </InputPlaceholder>
                            </motion.label>
                        </div>
                        <div className="w-full mb-2">
                            <motion.label
                                htmlFor="customer-phone"
                                className="relative"
                            >
                                {/* <PhoneInputContainer>
                                    <Controller
                                        name="phone"
                                        defaultValue=""
                                        render={({ field: { onChange } }) => (
                                            <PhoneInput
                                                country="ca"
                                                placeholder="+1 123 456 7890"
                                            />
                                        )}
                                    />
                                </PhoneInputContainer> */}
                            </motion.label>
                        </div>
                    </div>

                    <div className="mb-24">
                        <h3 className="mb-4 lg:mb-6">Shipping address</h3>
                        <div className="w-full mb-2">
                            <FormCountryContainer
                                id="country0"
                                aria-label="Country (optional)"
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
                            >
                                <FormSelectCountry
                                    onChange={(e) =>
                                        setCountry(
                                            e.target.options[
                                                e.target.selectedIndex
                                            ].text
                                        )
                                    }
                                    aria-label="Country (optional)"
                                >
                                    <CountryOptions />
                                </FormSelectCountry>
                                <CountryPlaceholder
                                    $isSelected={country !== ""}
                                >
                                    Country (optional)
                                </CountryPlaceholder>
                                {country && (
                                    <CountryValue>{country}</CountryValue>
                                )}
                                <PlusCountry>
                                    <Plus />
                                </PlusCountry>
                            </FormCountryContainer>
                        </div>
                        <CityZipContainer>
                            <div>
                                <motion.label
                                    htmlFor="customer-zip"
                                    className="relative"
                                >
                                    <FormInput
                                        id="customer-zip"
                                        type="text"
                                        required
                                        placeholder=" "
                                        aria-required
                                        maxLength={150}
                                        autoComplete="customer-zip"
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
                                        Postcode (optional)
                                    </InputPlaceholder>
                                </motion.label>
                            </div>
                            <div>
                                <motion.label
                                    htmlFor="customer-city"
                                    className="relative"
                                >
                                    <FormInput
                                        id="customer-city"
                                        type="text"
                                        required
                                        placeholder=" "
                                        aria-required
                                        maxLength={150}
                                        autoComplete="customer-city"
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
                                        City (optional)
                                    </InputPlaceholder>
                                </motion.label>
                            </div>
                        </CityZipContainer>
                        <div className="w-full mb-2">
                            <motion.label
                                htmlFor="customer-address"
                                className="relative"
                            >
                                <FormInput
                                    id="customer-address"
                                    type="text"
                                    required
                                    placeholder=" "
                                    aria-required
                                    maxLength={150}
                                    autoComplete="customer-address"
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
                                    Street and house number (optional)
                                </InputPlaceholder>
                            </motion.label>
                        </div>
                        <div className="w-full mb-2">
                            <motion.label
                                htmlFor="customer-company"
                                className="relative"
                            >
                                <FormInput
                                    id="customer-company"
                                    type="text"
                                    required
                                    placeholder=" "
                                    aria-required
                                    maxLength={150}
                                    autoComplete="customer-company"
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
                                    Company (optional)
                                </InputPlaceholder>
                            </motion.label>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 lg:mb-6">Update password</h3>

                        <PassowrdContainer>
                            <div>
                                <motion.label
                                    htmlFor="customer-password"
                                    className="relative"
                                >
                                    <FormInput
                                        id="customer-password"
                                        type="password"
                                        required
                                        placeholder=" "
                                        aria-required
                                        maxLength={150}
                                        autoComplete="customer-password"
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
                                        id="customer-passwordConfirm"
                                        type="password"
                                        required
                                        placeholder=" "
                                        aria-required
                                        maxLength={150}
                                        autoComplete="customer-passwordConfirm"
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
                    </div>
                </form>
            </Container>
        </Account>
    );
};

export default Settings;
