import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@framework/types/product";
import Heart from "@components/icons/Heart";
import {
    ProductBg,
    ProductFavorite,
    ProductImageWrapper,
    ProductName,
    ProductPrice,
    ProductTag,
    Root,
} from "./ProductCard.styled";

interface Props {
    product: Product;
    variant?: "simple" | "slim";
}

const ProductCard: FC<Props> = ({ product, variant = "simple" }) => {
    const { images, name, price } = product;
    const { url: thumbnailUrl, alt } = images[0];

    const { value: productPrice, currencyCode: currency } = price;

    const placeholderImage = "/product-image-placeholder.svg";
    const currencySymbol = currency === "EUR" ? "€" : "$";
    return (
        <Link href={`/${product.slug}`} passHref>
            <Root>
                <ProductBg />
                <ProductTag>
                    <ProductName>
                        <span>{name}</span>
                    </ProductName>
                    <ProductPrice>
                        {`${currencySymbol}${productPrice} ${currency}`}
                    </ProductPrice>
                </ProductTag>
                <ProductImageWrapper>
                    {product.images && (
                        <Image
                            src={thumbnailUrl ?? placeholderImage}
                            alt={alt ?? "Product image"}
                            height={540}
                            width={540}
                            quality="100"
                            layout="responsive"
                            objectFit="contain"
                        />
                    )}
                </ProductImageWrapper>
                <ProductFavorite
                    aria-label="Add to wishlist"
                    onClick={(e) => {
                        e.preventDefault();
                        alert("added to wishlist");
                    }}
                >
                    <Heart />
                </ProductFavorite>
            </Root>
        </Link>
    );
};

ProductCard.defaultProps = {
    variant: "simple",
};

export default ProductCard;
