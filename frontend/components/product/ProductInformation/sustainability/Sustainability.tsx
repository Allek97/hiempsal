import { FC } from "react";
import { motion } from "framer-motion";

import { ProductFeatures } from "@framework/types/product";

import { Container, Header, Item } from "../commun";

interface Props {
    sustainability: ProductFeatures;
}

const Sustainability: FC<Props> = ({ sustainability }) => {
    const { features: productSustainability, descriptions } = sustainability;

    return (
        <Container>
            <Header title="Sustainability" />
            <motion.ul
                className="block w-full h-full"
                exit={{ opacity: 0, transition: { duration: 0 } }}
            >
                {Object.entries(productSustainability).map(
                    ([feature, value]) => (
                        <Item
                            title={value.description}
                            content={value.content}
                            key={feature}
                            layout="C"
                        />
                    )
                )}

                {descriptions &&
                    descriptions.map((description) => (
                        <Item content={description} key={description} />
                    ))}
            </motion.ul>
        </Container>
    );
};

export default Sustainability;
