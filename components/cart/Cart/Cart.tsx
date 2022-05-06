import { FC } from "react";
import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";

import payments from "@lib/const/payments";
import { Media } from "@lib/media";

import { FunctionalLink } from "@components/utils";

import useCart from "@framework/cart/use-cart";

import { currencyMap } from "@framework/utils/optionMapping";

import {
    CartPaymentContainer,
    CheckoutButton,
    CheckoutWrapper,
    EmptyCartBox,
    EmptyCartRoot,
    ItemsHeader,
    PaymentVendors,
    Root,
    ShippingBox,
    ShoppingButton,
    ShoppingWrapper,
    TotalBox,
} from "./Cart.styled";
import { CartArticle } from "../CartArticle";

const containerVariant: Variants = {
    hidden: {
        height: 0,
    },
    visible: {
        height: "auto",
        transition: {
            duration: 0.5,
            ease: "easeIn",
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const Cart: FC = () => {
    const { data, isEmpty } = useCart();

    return (
        <Root>
            <Media greaterThanOrEqual="lg">
                <ItemsHeader>
                    <div>Product</div>
                    <div>Colors</div>
                    <div>Size</div>
                    <div>Gender</div>
                    <div>Price</div>
                </ItemsHeader>
            </Media>

            {isEmpty ? (
                <EmptyCartRoot>
                    <EmptyCartBox>
                        <h1>
                            Self-confidence is the best outfit,rock it and own
                            it !
                        </h1>
                    </EmptyCartBox>
                    <ShoppingWrapper>
                        <Link href="/" passHref>
                            <FunctionalLink>
                                <ShoppingButton
                                    Component="button"
                                    color="var(--accents-2)"
                                    aria-label="Go Shopping"
                                >
                                    Go Shopping
                                </ShoppingButton>
                            </FunctionalLink>
                        </Link>
                    </ShoppingWrapper>
                </EmptyCartRoot>
            ) : (
                <motion.div>
                    <motion.div
                        className="flex flex-col overflow-hidden"
                        variants={containerVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence>
                            {data?.lineItems.map((item) => (
                                <CartArticle
                                    cartItem={item}
                                    currencyCode={data.currency.code}
                                    key={`${item.id}-${item.variant.id}`}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <CartPaymentContainer>
                        <ShippingBox>
                            <h1>Shipping</h1>
                            <p>Free</p>
                        </ShippingBox>

                        <TotalBox>
                            <div>
                                <h1>Total</h1>
                                <p>(Taxes are calculated at checkout)</p>
                            </div>
                            <span>
                                {currencyMap[`${data?.currency.code}`] ?? "$"}
                                {data?.totalPrice}
                            </span>
                        </TotalBox>

                        <CheckoutWrapper>
                            <CheckoutButton Component="a" href="/api/checkout">
                                Checkout
                            </CheckoutButton>
                        </CheckoutWrapper>

                        <PaymentVendors>
                            {payments.map(({ id, icon }) => (
                                <li key={id}>{icon}</li>
                            ))}
                        </PaymentVendors>
                    </CartPaymentContainer>
                </motion.div>
            )}
        </Root>
    );
};

export default Cart;
