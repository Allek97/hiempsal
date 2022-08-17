import { Grid } from "@components/ui";

import { AnimateText } from "@components/utils/animations";
import { getConfig } from "@framework/api/config";
import { getQueryProducts } from "@framework/product";
import { Product } from "@framework/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useProduct } from "../context";
import { ProductCard } from "../ProductCard";
import { ProductSimilarBox } from "./ProductSimilar.styled";

interface Props {
    product: Product;
}

const ProductSimilar: FC<Props> = ({ product }) => {
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

    const { ref: titleRef, inView: isTitleInView } = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

    const { productType } = useProduct();

    useEffect(() => {
        let active = true;
        async function getSimilarProduct(): Promise<void> {
            try {
                const config = getConfig();
                const query = `product_type:${productType}`;

                const products: Product[] = await getQueryProducts({
                    config,
                    variables: { querySearch: query },
                });
                if (active) setSimilarProducts(products);
            } catch (err) {
                console.log(err);
            }
        }

        getSimilarProduct();

        return () => {
            active = false;
        };
    }, [product.id, productType]);

    return (
        <ProductSimilarBox>
            <header>
                <motion.div
                    className="relative w-20 h-20"
                    initial={{ opacity: 0 }}
                    animate={isTitleInView && { opacity: 1 }}
                    transition={{
                        delay: 0.1,
                        duration: 0.3,
                        ease: [0.7, 0.09, 0.71, 0.09],
                    }}
                >
                    <Image
                        src={product.images[1].url}
                        alt={product.images[1].alt || "product"}
                        layout="fill"
                        objectFit="contain"
                        quality="100"
                        priority
                    />
                </motion.div>
                <AnimateText
                    text="You may also like"
                    type="heading1"
                    isAnimate={isTitleInView}
                    version="slideFade"
                    staggerValue={0.02}
                    letterDuration={0.4}
                    refAnimation={titleRef}
                />
            </header>
            <Grid layout="technology">
                {similarProducts.map((similarProduct) => (
                    <ProductCard
                        product={similarProduct}
                        key={similarProduct.id}
                        variant="complex"
                    />
                ))}
            </Grid>
        </ProductSimilarBox>
    );
};

export default ProductSimilar;
