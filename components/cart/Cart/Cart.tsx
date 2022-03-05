import { FC } from "react";
import payments from "@lib/const/payments";
import { useMediaQueryNext } from "lib/customHooks";

import { useCart } from "@framework/cart";

import { currencyKeys } from "@lib/option";

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
    ShopPolicy,
    TotalBox,
} from "./Cart.styled";
import { CartArticle } from "../CartArticle";

const Cart: FC = () => {
    const isScreenLarge = useMediaQueryNext("lg");

    const { data, isEmpty } = useCart();

    return (
        <Root>
            {isScreenLarge && (
                <ItemsHeader>
                    <div>Product</div>
                    <div>Colors</div>
                    <div>Size</div>
                    <div>Quantity</div>
                    <div>Price</div>
                </ItemsHeader>
            )}
            {isEmpty ? (
                <EmptyCartRoot>
                    <EmptyCartBox>
                        <h1>
                            Are you equipped for modern society ? We provide
                            that for you !
                        </h1>
                    </EmptyCartBox>
                    <ShoppingWrapper>
                        <ShoppingButton
                            Component="button"
                            color="var(--accents-2)"
                        >
                            Go Shopping
                        </ShoppingButton>
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
                                <p>
                                    (Includes{" "}
                                    {currencyKeys[`${data?.currency.code}`]}
                                    {(data?.totalPrice ?? 0) -
                                        (data?.lineItemsSubtotalPrice ??
                                            0)}{" "}
                                    VAT)
                                </p>
                            </div>
                            <span>
                                {currencyKeys[`${data?.currency.code}`] ?? "$"}
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
            <ShopPolicy>
                <span>Delivery time: 5-7 business days</span>
                <span>100-day return period</span>
                <span>Free returns</span>
                <span>FREE SHIPPING FROM $50.00 CAD</span>
            </ShopPolicy>
        </Root>
    );
};

export default Cart;
