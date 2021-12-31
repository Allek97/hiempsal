import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdRemoveShoppingCart } from "react-icons/md";
import payments from "lib/const";

import {
    Article,
    CheckoutButton,
    CheckoutWrapper,
    PaymentVendors,
    ProductDetails,
    ProductImage,
    RemoveBtn,
    ShippingBox,
    ShopPolicy,
    TotalBox,
} from "./Cart.styled";
import { CartAction } from "..";

const Cart: FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col">
                <Article className="art">
                    <Link href="/" passHref>
                        <ProductImage>
                            <div className="w-full mx-8">
                                <Image
                                    src="/images/Men-Hoodie-White-Front.png"
                                    alt="Black hoodie"
                                    width={2}
                                    height={3}
                                    quality="100"
                                    layout="responsive"
                                    objectFit="contain"
                                    className="xxx"
                                />
                            </div>
                        </ProductImage>
                    </Link>

                    <ProductDetails>
                        <div>
                            <h2>
                                <span>Black Hoodie Men</span>
                            </h2>
                            <p>
                                <span>Dark radiant</span>
                                <span>M</span>
                            </p>
                        </div>

                        <div>
                            <span>$150.0</span>
                            {/* <span>CAD</span> */}
                        </div>

                        <div>
                            <RemoveBtn
                                type="button"
                                aria-label="Remove item"
                                onClick={() => alert("Remove Item")}
                            >
                                <MdRemoveShoppingCart />
                                <span>Remove</span>
                            </RemoveBtn>
                        </div>
                        <div>
                            <CartAction />
                        </div>
                    </ProductDetails>
                </Article>
            </div>

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

            <ShopPolicy>
                <span>Delivery time: 5-7 business days</span>
                <span>100-day return period</span>
                <span>Free returns</span>
                <span>FREE SHIPPING FROM $ 50.00 CAD</span>
            </ShopPolicy>
        </div>
    );
};

export default Cart;
