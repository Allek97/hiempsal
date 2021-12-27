import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdRemoveShoppingCart } from "react-icons/md";

import {
    Article,
    ProductDetails,
    ProductImage,
    RemoveBtn,
    ShippingBox,
    TotalBox,
} from "./Cart.styled";
import { CartAction } from "..";

const Cart: FC = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <Article>
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
                            <span>$150.00</span>
                            <span>CAD</span>
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
                    <span>(Includes $45CAD VAT)</span>
                </div>
                <p>$150CAD</p>
            </TotalBox>
        </div>
    );
};

export default Cart;
