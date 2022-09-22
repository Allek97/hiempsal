import { TechArticle } from "@components/elements";
import { Grid, Paddings } from "@components/ui";
import { AnimateText } from "@components/utils/animations";
import { getConfig } from "@framework/api/config";
import { getQueryProducts } from "@framework/product";
import { Product, ProductImage } from "@framework/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "../ProductCard";
import { ProductSimilarBox } from "./ProductSimilar.styled";

interface Props {
    productImage: ProductImage;
    productType: string;
    product: Product;
}

const ProductSimilar: FC<Props> = ({ productImage, productType, product }) => {
    const [similarProducts, setSimilarProducts] = useState<Product[]>([
        product,
    ]);

    const { ref: titleRef, inView: isTitleInView } = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

    useEffect(() => {
        let flag = true;
        const config = getConfig();

        async function fetcher() {
            const query = `product_type:${productType ?? "clothing"}`;

            const res: Product[] = await getQueryProducts({
                config,
                variables: { querySearch: query },
            });

            const products = res
                .filter((element) => element.id !== product.id)
                .slice(0, 3);

            if (flag) setSimilarProducts(products);
        }

        fetcher();

        return () => {
            flag = false;
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
                        src={productImage.url}
                        alt={productImage.alt || "product"}
                        layout="fill"
                        objectFit="contain"
                        priority
                        placeholder="blur"
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
            <Paddings>
                <Grid layout="technology">
                    {!!similarProducts.length &&
                    similarProducts[0].type === "clothing"
                        ? similarProducts.map((similarProduct) => (
                              <ProductCard
                                  product={similarProduct}
                                  key={similarProduct.id}
                                  variant="complex"
                              />
                          ))
                        : similarProducts.map((similarProduct) => (
                              <TechArticle
                                  product={similarProduct}
                                  key={similarProduct.id}
                              />
                          ))}
                </Grid>
            </Paddings>
        </ProductSimilarBox>
    );
};

export default ProductSimilar;
