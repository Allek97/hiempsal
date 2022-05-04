import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { useMediaQueryNext } from "@hooks";
import { MdRemoveShoppingCart } from "react-icons/md";

import { LineItem } from "@framework/types/cart";
import { colorMap, currencyMap } from "@framework/utils/optionMapping";
import { truncateText } from "@lib/truncateText";
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

const CartArticle: FC<Props> = ({ cartItem, currencyCode }) => {
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
                {isScreenSmall && (
                    <>
                        <DecorationTop color="medium" />
                        <DecorationBottom color="dark" />
                    </>
                )}
                <div>
                    <h2>
                        {!isScreenTiny
                            ? truncateText(cartItem.name, 29)
                            : cartItem.name}
                    </h2>
                    <article>
                        <span className="capitalize">
                            {colorMap[`${selectedColor}`]}
                        </span>
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
