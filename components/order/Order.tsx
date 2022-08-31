/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Variants } from "framer-motion";

import { useMediaQueryNext } from "@hooks";
import { MdRemoveShoppingCart } from "react-icons/md";

import { LineItem } from "@framework/types/cart";
import { currencyMap } from "@framework/utils/optionMapping";
import { truncateText } from "@lib/truncateText";
import useRemoveItem from "@framework/cart/use-remove-item";

import {
    Article,
    DecorationBottom,
    DecorationTop,
    ImageContainer,
    ProductDetails,
    RemoveBtn,
} from "./Order.styled";

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

const Order: FC<Props> = ({ cartItem, currencyCode }) => {
    const isScreenSmall = useMediaQueryNext("sm");
    const isScreenTiny = useMediaQueryNext(21.875);

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
                {isScreenSmall && (
                    <>
                        <DecorationTop color="medium" />
                        <DecorationBottom color="dark" />
                    </>
                )}
                <div>
                    <h2>
                        <Link href={`/products/${cartItem.path}`} passHref>
                            <a>
                                {!isScreenTiny
                                    ? truncateText(cartItem.name, 29)
                                    : cartItem.name}
                            </a>
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
            </ProductDetails>
        </Article>
    );
};

export default Order;