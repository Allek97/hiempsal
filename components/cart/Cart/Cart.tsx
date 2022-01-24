import { FC, useState } from "react";
import payments from "lib/const";
import { useMediaQueryNext } from "lib/customHooks";

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

    const [isCartEmpty, _] = useState<boolean>(false);

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
            {isCartEmpty ? (
                <EmptyCartRoot>
                    <EmptyCartBox>
                        <h1>
                            Are you equipped for modern society ? We have all
                            you need !
                        </h1>
                    </EmptyCartBox>
                    <ShoppingWrapper>
                        <ShoppingButton Component="button">
                            Go Shopping
                        </ShoppingButton>
                    </ShoppingWrapper>
                </EmptyCartRoot>
            ) : (
                <>
                    <div className="flex flex-col">
                        <CartArticle />
                        <CartArticle />
                        <CartArticle />
                        <CartArticle />
                        <CartArticle />
                        <CartArticle />
                        <CartArticle />
                        <CartArticle />
                        <CartArticle />
                        <CartArticle />
                        <CartArticle />
                    </div>

                    <CartPaymentContainer>
                        <ShippingBox>
                            <h1>Shipping</h1>
                            <p>Free</p>
                        </ShippingBox>

                        <TotalBox>
                            <div>
                                <h1>Total</h1>
                                <p>(Includes $45.5 VAT)</p>
                            </div>
                            <span>$150.0</span>
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
