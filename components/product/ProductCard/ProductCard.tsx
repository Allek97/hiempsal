import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@framework/types/product";
import Heart from "@components/icons/Heart";
import { ProductArticle } from "@components/common/ProductArticle";
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
    variant?: "slim" | "simple" | "complex";
    onDisplay?: boolean;
}

const ProductCard: FC<Props> = ({ product, variant = "simple", onDisplay }) => {
    const { images, name, price } = product;
    const { url: thumbnailUrl, alt } = images[0];

    const { value: productPrice, currencyCode: currency } = price;

    const placeholderImage = "/product-image-placeholder.svg";
    const currencySymbol = currency === "EUR" ? "€" : "$";
    return (
        <>
            {variant === "slim" && (
                <Link href={`/${product.slug}`} passHref>
                    <>
                        <div className="absolute inset-0 z-20 flex items-center justify-center ">
                            <span className="bg-black text-white p-3 font-bold text-xl">
                                {product.name}
                            </span>
                        </div>
                        {product.images && (
                            <ProductImageWrapper>
                                <Image
                                    alt={product.name ?? "Product image"}
                                    src={
                                        product.images[0].url ??
                                        placeholderImage
                                    }
                                    height={320}
                                    width={320}
                                    quality="85"
                                    layout="fixed"
                                />
                            </ProductImageWrapper>
                        )}
                    </>
                </Link>
            )}

            {variant === "simple" && (
                <Link href={`/${product.slug}`} passHref>
                    <Root className="product-card" id="product-card">
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
            )}

            {variant === "complex" && (
                <Link href={`/${product.slug}`} passHref>
                    <ProductArticle
                        variant="product"
                        onDisplay={onDisplay}
                        layout="B"
                    />
                </Link>
            )}
        </>
    );
};

ProductCard.defaultProps = {
    variant: "simple",
    onDisplay: false,
};

export default ProductCard;
