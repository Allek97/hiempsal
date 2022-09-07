import {
    CountryPlaceholder,
    CountryValue,
    ErrorForm,
    FormCountryContainer,
    FormInput,
    FormSelectCountry,
    InputPlaceholder,
} from "@components/elements/FormInputsStyle";
import { Plus } from "@components/icons";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import tw from "twin.macro";
import CountryOptions from "../CountryOptions";
import { CustomerUpdate } from "../Settings";
import { useCustomerSettings } from "./context";

export const PlusCountry = styled.div`
    ${tw`absolute right[4vw] top-1/2 pointer-events-none
    md:right[2vw]
    lg:right[1.34vw]`}

    transform: translateY(-50%);

    svg {
        width: 16px;
        height: 16px;

        fill: var(--orange-red);
    }
`;

export const CityZipContainer = styled.div`
    ${tw`flex w-full justify-between mb-2`}
    & > div {
        ${tw`width[calc(50% - 1vw)] 
        lg:(width[calc(50% - 0.333vw)])`}
    }
`;

const AddressForm: FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<CustomerUpdate>();

    const {
        address1,
        city,
        company,
        country,
        zip,
        setAddress1,
        setCity,
        setCompany,
        setCountry,
        setZip,
    } = useCustomerSettings();

    return (
        <div className="w-full">
            <div className="w-full mb-2">
                {errors.country?.message && (
                    <ErrorForm className="my-2 font-bold">
                        <span className="mr-auto text-orange-red">
                            {errors.country?.message}
                        </span>
                    </ErrorForm>
                )}
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
                        {...register("country")}
                        value={country}
                        onChange={(e) =>
                            setCountry(
                                e.target.options[e.target.selectedIndex].text
                            )
                        }
                        aria-label="Country (optional)"
                    >
                        <CountryOptions />
                    </FormSelectCountry>
                    <CountryPlaceholder $isSelected>
                        Country (optional)
                    </CountryPlaceholder>
                    {country && <CountryValue>{country}</CountryValue>}
                    <PlusCountry>
                        <Plus />
                    </PlusCountry>
                </FormCountryContainer>
            </div>
            <CityZipContainer>
                <div>
                    <motion.label htmlFor="customer-zip" className="relative">
                        <FormInput
                            {...register("zip")}
                            id="customer-zip"
                            type="text"
                            required
                            placeholder=" "
                            aria-required
                            maxLength={150}
                            autoComplete="customer-zip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
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
                        <InputPlaceholder>Postcode (optional)</InputPlaceholder>
                    </motion.label>
                </div>
                <div>
                    <motion.label htmlFor="customer-city" className="relative">
                        <FormInput
                            {...register("city")}
                            id="customer-city"
                            type="text"
                            required
                            placeholder=" "
                            aria-required
                            maxLength={150}
                            autoComplete="customer-city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
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
                        <InputPlaceholder>City (optional)</InputPlaceholder>
                    </motion.label>
                </div>
            </CityZipContainer>
            <div className="w-full mb-2">
                <motion.label htmlFor="customer-address" className="relative">
                    <FormInput
                        {...register("address1")}
                        id="customer-address"
                        type="text"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="customer-address"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
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
                <motion.label htmlFor="customer-company" className="relative">
                    <FormInput
                        {...register("company")}
                        id="customer-company"
                        type="text"
                        required
                        placeholder=" "
                        aria-required
                        maxLength={150}
                        autoComplete="customer-company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
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
                    <InputPlaceholder>Company (optional)</InputPlaceholder>
                </motion.label>
            </div>
        </div>
    );
};

export default AddressForm;
