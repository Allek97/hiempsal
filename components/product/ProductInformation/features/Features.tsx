import { FC } from "react";
import { motion, Variants } from "framer-motion";

import { useProductInfo } from "@components/product/context";
import { ProductFeatures } from "@framework/types/product";

import { Root } from "./Features.styled";
import { Header, Item } from "../commun";

interface Props {
    features: ProductFeatures;
}

const Features: FC<Props> = ({ features }) => {
    const { features: productFeatures, descriptions } = features;

    const { isProductOverviewOpen } = useProductInfo();

    const featureMotion: Variants = {
        hidden: { height: 0 },
        visible: { height: "auto", transition: { duration: 0.4, delay: 0.1 } },
        exit: {
            height: 0,
            overflowY: "hidden",
            transition: { duration: isProductOverviewOpen ? 0.3 : 0 },
        },
    };

    return (
        <Root
            initial="hidden"
            animate="visible"
            variants={featureMotion}
            exit="exit"
            key="features"
        >
            <motion.ul
                className="block w-full h-full overflow-y-auto"
                exit={{ opacity: 0, transition: { duration: 0 } }}
            >
                <Header title="Features" />

                {Object.keys(productFeatures).map((feature) => {
                    if (feature === "itemNumber")
                        return (
                            <Item
                                title="Item number"
                                content={productFeatures[feature]}
                                key={feature}
                            />
                        );
                    if (feature === "backLength")
                        return (
                            <Item
                                title="Back length"
                                content={`${productFeatures[feature]} cm`}
                                key={feature}
                            />
                        );
                    if (feature === "weight")
                        return (
                            <Item
                                title="Weight"
                                content={`${productFeatures[feature]} g`}
                                key={feature}
                            />
                        );
                    if (feature === "denier")
                        return (
                            <Item
                                title="Denier (main material)"
                                content={productFeatures[feature]}
                                key={feature}
                            />
                        );
                    if (feature === "cut")
                        return (
                            <Item
                                title="Cut"
                                content={productFeatures[feature]}
                                key={feature}
                            />
                        );
                    return null;
                })}

                {descriptions.map((description) => (
                    <Item title={description} key={description} />
                ))}
            </motion.ul>
        </Root>
    );
};

export default Features;
