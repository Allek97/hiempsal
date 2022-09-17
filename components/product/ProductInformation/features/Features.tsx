import tw from "twin.macro";
import styled from "@emotion/styled";
import { FC } from "react";
import { motion } from "framer-motion";

import { ProductFeatures } from "@framework/types/product";

import { Container, Header, Item } from "../commun";

interface Props {
    features: ProductFeatures;
}

const Wrapper = styled.div`
    p {
        ${tw`text-align[end]`}
    }
`;

const Features: FC<Props> = ({ features }) => {
    const { features: productFeatures, descriptions } = features;

    return (
        <Container>
            <Header title="Features" />
            <motion.ul
                className="block w-full h-full"
                exit={{ opacity: 0, transition: { duration: 0, dalay: 0 } }}
            >
                {Object.entries(productFeatures).map(([feature, value]) => (
                    <Wrapper key={feature}>
                        <Item
                            title={value.description}
                            content={value.content}
                        />
                    </Wrapper>
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
