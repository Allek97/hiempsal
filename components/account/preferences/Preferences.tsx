/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { CartButton } from "@components/common/ProductPopup";
import { ErrorForm } from "@components/elements/FormInputsStyle";
import useCustomer from "@framework/customer/use-customer";
import useCustomerUpdate from "@framework/customer/use-customer-update";
import { getCustomerToken } from "@framework/utils";
import { Checkbox } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Account } from "../commun";
import { Container, MailForm } from "./Preferences.styled";

const Preferences: FC = () => {
    const { data: customer } = useCustomer();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [loading, setIsloading] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string>("");

    useEffect(() => {
        setIsChecked(customer?.acceptsMarketing ?? false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function timeout(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    const updateCustomer = useCustomerUpdate();
    async function onSubmit(): Promise<void> {
        try {
            setConfirm(false);
            setIsloading(true);
            setServerError("");

            await updateCustomer({
                customer: {
                    acceptsMarketing: isChecked,
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
            if (error instanceof Error) setServerError(error.message);
        }
    }
    return (
        <Account>
            <Container>
                <div className="flex flex-col items-center mb-24 text-center">
                    <h1 className="mb-20">Notifications</h1>
                    <span className="notification">
                        We want to stay in touch, but only if you want us to.
                        Change how we keep in contact below.
                    </span>
                </div>
                <MailForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <h2 className="mb-2">Email</h2>
                    <div className="marketing w-1/2">
                        <label
                            htmlFor="customer-marketing"
                            className="flex items-center w-max mb-2"
                        >
                            <Checkbox
                                id="customer-marketing"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                inputProps={{ "aria-label": "controlled" }}
                                color="error"
                            />
                            <p className="newsletter">Newsletter*</p>
                        </label>
                        <span className="block mb-9 text-accents-7">
                            Our newsletters are sent two to three times a month
                        </span>
                        <h3 className="mb-4">Your Benefits</h3>
                        <ul className="mb-5 text-accents-7">
                            <li>Special offers and new products</li>
                            <li>Events and news from our athletes</li>
                            <li>
                                Tips and hints on how to get the best out of our
                                products
                            </li>
                        </ul>
                        <span
                            className="italic"
                            style={{ lineHeight: "normal !important" }}
                        >
                            * I agree that my email address can be used by
                            Hiempsal for sending me general and tailored
                            advertising materials about products, tours,
                            promotions, events and news via email. I hereby
                            confirm that I am at least 16 years old. You can
                            revoke this consent at any time. More information in
                            our Data Protection Policy.
                        </span>
                        <div className="mt-10 ml-auto">
                            <CartButton
                                isLoading={loading}
                                preText={confirm ? "Saved!" : "Save"}
                                loadingText="Saving..."
                                type="submit"
                            />
                        </div>
                    </div>
                </MailForm>
                {serverError && (
                    <ErrorForm className="mt-4">
                        <span className="mr-auto text-orange-red">
                            {serverError}
                        </span>
                    </ErrorForm>
                )}
            </Container>
        </Account>
    );
};

export default Preferences;
