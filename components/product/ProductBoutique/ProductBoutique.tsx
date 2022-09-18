import { FC } from "react";
import { motion } from "framer-motion";
import { TechArticle } from "@components/elements";

import { AnimateText } from "@components/utils/animations";
import { useInView } from "react-intersection-observer";
import { Product } from "@framework/types/product";

import {
    ProductBoutiqueBox,
    ProductBoutiqueGrid,
} from "./ProductBoutique.styled";
import { ProductCard } from "../ProductCard";

interface Props {
    boutiqueProducts: Product[];
}

const ProductBoutique: FC<Props> = ({ boutiqueProducts }) => {
    const { ref: titleRef, inView: isTitleInView } = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

    return (
        <ProductBoutiqueBox>
            <header>
                <div className="flex items-center w-max">
                    <AnimateText
                        text={`Visit hiempsal ${boutiqueProducts[0].type} shop`}
                        type="heading1"
                        isAnimate={isTitleInView}
                        version="slideFade"
                        staggerValue={0.02}
                        letterDuration={0.4}
                        refAnimation={titleRef}
                    />
                    <motion.span
                        className="blinking-dot"
                        style={{ marginTop: "0.35em", borderRadius: "50%" }}
                        animate={{ opacity: [0, 1, 1, 0, 0] }}
                        transition={{
                            repeat: Infinity,
                            repeatDelay: 0.75,
                        }}
                    />
                </div>
            </header>
            <ProductBoutiqueGrid>
                {boutiqueProducts[0].type === "clothing"
                    ? boutiqueProducts.map((product) => (
                          <ProductCard
                              product={product}
                              key={product.id}
                              variant="complex"
                          />
                      ))
                    : boutiqueProducts.map((product) => (
                          <TechArticle product={product} key={product.id} />
                      ))}
            </ProductBoutiqueGrid>
        </ProductBoutiqueBox>
    );
};

export default ProductBoutique;
