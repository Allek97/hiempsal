import { Grid, Paddings } from "@components/ui";
import { AnimateText } from "@components/utils/animations";
import { Product, ProductImage } from "@framework/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "../ProductCard";
import { ProductSimilarBox } from "./ProductSimilar.styled";

interface Props {
    productImage: ProductImage;
    similarProducts: Product[];
}

const ProductSimilar: FC<Props> = ({ productImage, similarProducts }) => {
    const { ref: titleRef, inView: isTitleInView } = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

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
            <Paddings>
                <Grid layout="technology">
                    {similarProducts.map((similarProduct) => (
                        <ProductCard
                            product={similarProduct}
                            key={similarProduct.id}
                            variant="complex"
                        />
                    ))}
                </Grid>
            </Paddings>
        </ProductSimilarBox>
    );
};

export default ProductSimilar;
