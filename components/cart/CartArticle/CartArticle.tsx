import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { useMediaQueryNext } from "lib/customHooks";
import { MdRemoveShoppingCart } from "react-icons/md";

import { LineItem } from "@framework/types/cart";
import { CurrencyCode } from "@framework/schema";

import { CartQuantity } from "..";

import {
    Article,
    DecorationBottom,
    DecorationTop,
    ProductDetails,
    ProductImage,
    RemoveBtn,
} from "./CartArticle.styled";

interface Props {
    cartItem: LineItem;
    currencyCode: CurrencyCode;
}

const CartArticle: FC<Props> = ({ cartItem, currencyCode }) => {
    const isScreenLarge = useMediaQueryNext("lg");

    return (
        <Article className="article-item">
            <Link href="/" passHref>
                <ProductImage>
                    <div>
                        <Image
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            src={cartItem.variant.image!.url ?? ""}
                            alt={cartItem.variant.image?.alt}
                            width={2}
                            height={3}
                            quality="80"
                            layout="responsive"
                            objectFit="contain"
                            unoptimized
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
                        <span>{cartItem.name}</span>
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
