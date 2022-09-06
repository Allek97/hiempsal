/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { parsePhoneNumber } from "awesome-phonenumber";
import {
    CountryDropdown,
    RegionDropdown,
    CountryRegionData,
} from "react-country-region-selector";

import useCustomer from "@framework/customer/use-customer";
import {
    CountryPlaceholder,
    CountryValue,
    FormCountryContainer,
    FormInput,
    FormSelectCountry,
    InputPlaceholder,
} from "@components/elements/FormInputsStyle";

import { Account } from "../commun";
import { Container, CustomerAvatar, PlusCountry } from "./Settings.styled";
import CountryOptions from "./CountryOptions";
import { Plus } from "@components/icons";

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
                                    type="email"
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
                                    type="email"
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
                                <FormInput
                                    id="customer-phone"
                                    type="email"
                                    required
                                    placeholder=" "
                                    aria-required
                                    maxLength={150}
                                    autoComplete="customer-phone"
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
                                    Phone Number (optional)
                                </InputPlaceholder>
                            </motion.label>
                        </div>
                    </div>

                    <div className="w-full mb-12">
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
                                style={
                                    country !== ""
                                        ? {
                                              backgroundColor: "#f0f0f0",
                                              borderColor: "rgba(0, 0, 0, 0.1)",
                                          }
                                        : {}
                                }
                            >
                                <FormSelectCountry
                                    onChange={(e) =>
                                        setCountry(
                                            e.target.options[
                                                e.target.selectedIndex
                                            ].text
                                        )
                                    }
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

                        <div className="w-full mb-2">
                            <motion.label
                                htmlFor="customer-firstName"
                                className="relative"
                            >
                                <FormInput
                                    id="customer-firstName"
                                    type="email"
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
                                    type="email"
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
                                <FormInput
                                    id="customer-phone"
                                    type="email"
                                    required
                                    placeholder=" "
                                    aria-required
                                    maxLength={150}
                                    autoComplete="customer-phone"
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
                                    Phone Number (optional)
                                </InputPlaceholder>
                            </motion.label>
                        </div>
                    </div>
                </form>
            </Container>
        </Account>
    );
};

export default Settings;
