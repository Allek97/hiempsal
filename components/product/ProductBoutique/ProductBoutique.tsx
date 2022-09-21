import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TechArticle } from "@components/elements";

import { AnimateText } from "@components/utils/animations";
import { useInView } from "react-intersection-observer";
import { Product } from "@framework/types/product";
import { getConfig } from "@framework/api/config";
import { getQueryProducts } from "@framework/product";

import {
    ProductBoutiqueBox,
    ProductBoutiqueGrid,
} from "./ProductBoutique.styled";
import { ProductCard } from "../ProductCard";

interface Props {
    productType: string;
    product: Product;
}

const ProductBoutique: FC<Props> = ({ productType, product }) => {
    const [boutiqueProducts, setSimilarProducts] = useState<Product[]>([
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
            const type = productType === "clothing" ? "technology" : "clothing";
            const query = `product_type:${type ?? "clothing"}`;

            const res: Product[] = await getQueryProducts({
                config,
                variables: { querySearch: query },
            });

            if (flag) setSimilarProducts(res);
        }

        fetcher();

        return () => {
            flag = false;
        };
    }, [productType]);

    return (
        <ProductBoutiqueBox>
            <header>
                <div className="flex items-center">
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
                    ? boutiqueProducts.map((boutiqueProduct) => (
                          <ProductCard
                              product={boutiqueProduct}
                              key={boutiqueProduct.id}
                              variant="complex"
                          />
                      ))
                    : boutiqueProducts.map((boutiqueProduct) => (
                          <TechArticle
                              product={boutiqueProduct}
                              key={boutiqueProduct.id}
                          />
                      ))}
            </ProductBoutiqueGrid>
        </ProductBoutiqueBox>
    );
};

export default ProductBoutique;
