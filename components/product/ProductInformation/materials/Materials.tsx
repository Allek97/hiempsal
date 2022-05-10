import { FC } from "react";
import { motion } from "framer-motion";

import { ProductFeatures } from "@framework/types/product";

import { Container, Header, Item } from "../commun";

interface Props {
    features: ProductFeatures;
}

const Materials: FC<Props> = ({ features }) => {
    const { features: productFeatures, descriptions } = features;

    return (
        <Container>
            <motion.ul
                className="block w-full h-full overflow-y-auto"
                exit={{ opacity: 0, transition: { duration: 0 } }}
            >
                <Header title="Materials & technologies" />

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
        </Container>
    );
};

export default Materials;
