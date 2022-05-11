import { FC } from "react";
import { motion } from "framer-motion";

import { ProductFeatures } from "@framework/types/product";

import { Container, Header, Item } from "../commun";

interface Props {
    features: ProductFeatures;
}

const Features: FC<Props> = ({ features }) => {
    const { features: productFeatures, descriptions } = features;

    return (
        <Container>
            <Header title="Features" />
            <motion.ul
                className="block w-full h-full"
                exit={{ opacity: 0, transition: { duration: 0 } }}
            >
                {Object.entries(productFeatures).map(([feature, value]) => (
                    <Item
                        title={value.description}
                        content={value.content}
                        key={feature}
                    />
                ))}

                {descriptions &&
                    descriptions.map((description) => (
                        <Item content={description} key={description} />
                    ))}
            </motion.ul>
        </Container>
    );
};

export default Features;
