import { Plus } from "@components/icons";
import { motion, Variants } from "framer-motion";
import { FC } from "react";

import { InfoBox, InfoBtn, List, Root } from "./ProductInformation.styled";

const textMotion: Variants = {
    hover: {
        skewX: "-10deg",
        transformOrigin: "center bottom",
        transition: {
            duration: 0.3,
            ease: [0.19, 1, 0.22, 1],
        },
    },
};
const svgMotion: Variants = {
    hover: {
        scale: 1.07,
    },
};

interface InfoProps {
    infoName: string;
}

const Info: FC<InfoProps> = ({ infoName }) => {
    return (
        <InfoBox>
            <InfoBtn type="button" whileHover="hover">
                <motion.span variants={textMotion}>{infoName}</motion.span>
                <motion.div variants={svgMotion}>
                    <Plus />
                </motion.div>
            </InfoBtn>
        </InfoBox>
    );
};

const ProductDetails: FC = () => {
    return (
        <Root>
            <List>
                <dt>Product Information</dt>
                <Info infoName="Features" />
                <Info infoName="Materials & technologies" />
                <Info infoName="Sustainability" />
                <Info infoName="Dimensions" />
                <Info infoName="Shipping info" />
            </List>
        </Root>
    );
};

export default ProductDetails;
