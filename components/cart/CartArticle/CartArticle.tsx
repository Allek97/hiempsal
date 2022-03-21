import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { useMediaQueryNext } from "lib/customHooks";
import { MdRemoveShoppingCart } from "react-icons/md";

import { LineItem } from "@framework/types/cart";
import { colorKeys, currencyKeys } from "@lib/option";

import { CartQuantity } from "..";

import {
    Article,
    DecorationBottom,
    DecorationTop,
    ImageContainer,
    ProductDetails,
    RemoveBtn,
} from "./CartArticle.styled";

interface Props {
    cartItem: LineItem;
    currencyCode: string;
}

const CartArticle: FC<Props> = ({ cartItem, currencyCode }) => {
    const isScreenLarge = useMediaQueryNext("lg");

    const selectedColor = cartItem.options?.find((option) =>
        option.displayName.toLowerCase().match(/colou?r/gi)
    )?.values[0].hexColor;
    const selectedSize = cartItem.options?.find(
        (option) => option.displayName.toLowerCase() === "size"
    )?.values[0].label;

    return (
        <Article className="article-item">
            <Link href="/" passHref>
                <ImageContainer>
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        src={cartItem.variant.image!.url ?? ""}
                        alt={cartItem.variant.image?.alt}
                        quality="85"
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </ImageContainer>
            </Link>

            <ProductDetails>
                {isScreenLarge && (
                    <>
                        <DecorationTop color="medium" />
                        <DecorationBottom color="dark" />
                    </>
                )}
                <div>
                    <h2>{cartItem.name}</h2>
                    <article>
                        <span className="capitalize">
                            {colorKeys[`${selectedColor}`]}
                        </span>
                        <span className="uppercase">
                            {selectedSize ?? "N.D"}
                        </span>
                    </article>
                </div>

                <div>
                    <span>
                        {currencyKeys[currencyCode]}
                        {Number(cartItem.variant.price)?.toFixed(0)}
                    </span>
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
                    <CartQuantity quantity={cartItem.quantity} />
                </div>
            </ProductDetails>
        </Article>
    );
};

export default CartArticle;
