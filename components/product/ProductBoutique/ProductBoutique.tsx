import { FC } from "react";
import { motion } from "framer-motion";
import { TechArticle } from "@components/elements";

import { AnimateText } from "@components/utils/animations";
import { useInView } from "react-intersection-observer";

import {
    ProductBoutiqueBox,
    ProductBoutiqueGrid,
} from "./ProductBoutique.styled";

const ProductBoutique: FC = () => {
    const { ref: titleRef, inView: isTitleInView } = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

    return (
        <ProductBoutiqueBox>
            <header>
                <div className="flex items-center w-max">
                    <AnimateText
                        text="Visit hiempsal technology shop"
                        type="heading1"
                        isAnimate={isTitleInView}
                        version="slideFade"
                        staggerValue={0.02}
                        letterDuration={0.4}
                        refAnimation={titleRef}
                    />
                    <motion.span
                        className="block h-2 w-2 bg-red"
                        style={{ marginTop: "0.35em", borderRadius: "50%" }}
                    />
                </div>
            </header>
            <ProductBoutiqueGrid>
                <TechArticle />
                <TechArticle />
                <TechArticle />
            </ProductBoutiqueGrid>
        </ProductBoutiqueBox>
    );
};

export default ProductBoutique;
