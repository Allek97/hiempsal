import { FC } from "react";
import Link from "next/link";
import payments from "@lib/const/payments";
import { Media } from "@lib/media";

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
                            <ShoppingButton
                                Component="button"
                                color="var(--accents-2)"
                                aria-label="Go Shopping"
                            >
                                Go Shopping
                            </ShoppingButton>
                        </Link>
                    </ShoppingWrapper>
                </EmptyCartRoot>
            ) : (
                <>
                    <div className="flex flex-col">
                        {data?.lineItems.map((item) => (
                            <CartArticle
                                cartItem={item}
                                currencyCode={data.currency.code}
                                key={item.id}
                            />
                        ))}
                    </div>

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
                            <CheckoutButton Component="a" href="/checkout">
                                Checkout
                            </CheckoutButton>
                        </CheckoutWrapper>

                        <PaymentVendors>
                            {payments.map(({ id, icon }) => (
                                <li key={id}>{icon}</li>
                            ))}
                        </PaymentVendors>
                    </CartPaymentContainer>
                </>
            )}
        </Root>
    );
};

export default Cart;
