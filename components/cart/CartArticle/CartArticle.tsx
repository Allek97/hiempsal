import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { useMediaQueryNext } from "lib/customHooks";
import { MdRemoveShoppingCart } from "react-icons/md";

import { CartQuantity } from "..";

import {
    Article,
    DecorationBottom,
    DecorationTop,
    ProductDetails,
    ProductImage,
    RemoveBtn,
} from "./CartArticle.styled";

const CartArticle: FC = () => {
    const isScreenLarge = useMediaQueryNext("lg");
    return (
        <Article className="article-item">
            <Link href="/" passHref>
                <ProductImage>
                    <div>
                        <Image
                            src="/images/Men-Hoodie-Black-Front.png"
                            alt="Black hoodie"
                            width={2}
                            height={3}
                            quality="80"
                            layout="responsive"
                            objectFit="contain"
                            priority
                        />
                    </div>
                </ProductImage>
            </Link>

            <ProductDetails>
                {isScreenLarge && (
                    <>
                        <DecorationTop color="medium" />
                        <DecorationBottom color="dark" />
                    </>
                )}
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
                    <CartQuantity />
                </div>
            </ProductDetails>
        </Article>
    );
};

export default CartArticle;
