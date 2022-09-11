/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Variants } from "framer-motion";

import { MdRemoveShoppingCart } from "react-icons/md";

import { LineItem } from "@framework/types/cart";
import { currencyMap } from "@framework/utils/optionMapping";

import useRemoveItem from "@framework/cart/use-remove-item";

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

const articleVariant: Variants = {
    hidden: {
        opacity: 0,
        transition: {
            ease: "easeIn",
            duration: 0.3,
        },
    },
    visible: {
        opacity: 1,
        transition: {
            ease: "easeIn",
            duration: 0.3,
        },
    },
};

const CartArticle: FC<Props> = ({ cartItem, currencyCode }) => {
    const selectedColor = cartItem.options?.find((option) =>
        option.displayName.toLowerCase().match(/colou?r/gi)
    )?.values[0].hexColor;
    const selectedSize = cartItem.options?.find(
        (option) => option.displayName.toLowerCase() === "size"
    )?.values[0].label;
    const selectedGender = cartItem.options?.find(
        (option) => option.displayName.toLowerCase() === "gender"
    )?.values[0].label;

    const removeItem = useRemoveItem();
    return (
        <Article
            className="article-item"
            variants={articleVariant}
            exit={{
                height: 0,
                opacity: 0,
                transition: {
                    duration: 0.4,
                    opacity: {
                        duration: 0.3,
                    },
                },
            }}
        >
            <Link href={`/products/${cartItem.path}`} passHref>
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
                <span className="hidden sm:block">
                    <DecorationTop color="medium" />
                    <DecorationBottom color="dark" />
                </span>

                <div>
                    <h2 className="overflow-ellipsis">
                        <Link href={`/products/${cartItem.path}`} passHref>
                            <a className="overflow-ellipsis">{cartItem.name}</a>
                        </Link>
                    </h2>
                    <article>
                        <span className="capitalize">{selectedColor}</span>
                        <span className="uppercase">
                            {selectedSize ?? "N.D"}
                        </span>
                        <span className="capitalize">
                            {selectedGender ?? "N.D"}
                        </span>
                    </article>
                </div>

                <div>
                    <span>
                        {currencyMap[currencyCode]}
                        {Number(cartItem.variant.price)?.toFixed(0)}
                    </span>
                    {/* <span>CAD</span> */}
                </div>

                <div>
                    <RemoveBtn
                        type="button"
                        aria-label="Remove item"
                        onClick={() => removeItem({ lineItemId: cartItem.id })}
                    >
                        <MdRemoveShoppingCart />
                        <span>Remove</span>
                    </RemoveBtn>
                </div>

                <div>
                    <CartQuantity cartItem={cartItem} />
                </div>
            </ProductDetails>
        </Article>
    );
};

export default CartArticle;
