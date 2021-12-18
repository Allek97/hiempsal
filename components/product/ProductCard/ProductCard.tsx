import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@framework/types/product";
import Heart from "@components/icons/Heart";
import { ProductName, ProductPrice, Root } from "./ProductCard.styled";

interface Props {
    product: Product;
    variant?: "simple" | "slim";
}

const ProductCard: FC<Props> = ({ product, variant = "simple" }) => {
    const { images, name, price } = product;
    const { url: thumbnailUrl, alt } = images[0];

    const { value: productPrice, currencyCode: currency } = price;

    const currencySymbol = currency === "EUR" ? "€" : "$";
    return (
        <Link href={`/${product.slug}`} passHref>
            <Root>
                <div>
                    <ProductName>
                        <span>{name}</span>
                    </ProductName>
                    <ProductPrice>{`${currencySymbol}${productPrice} ${currency}`}</ProductPrice>
                </div>

                <Image src={thumbnailUrl} alt={alt} height={500} width={400} />

                <Heart />
            </Root>
        </Link>
    );
};

ProductCard.defaultProps = {
    variant: "simple",
};

export default ProductCard;
