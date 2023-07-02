import { FC } from "react";
import { motion, Variants } from "framer-motion";

import { Plus } from "@components/icons";
import { HelpCard } from "@components/elements";
import { useUI } from "@components/ui/context";
import { useProduct } from "../context";

import { InfoBox, InfoBtn, List, Root } from "./ProductInformation.styled";

const textMotion: Variants = {
    hover: {
        skewX: "-10deg",
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
    infoName:
        | "Features"
        | "Materials & technologies"
        | "Sustainability"
        | "Dimensions"
        | "Shipping info";
}

const Info: FC<InfoProps> = ({ infoName }) => {
    const {
        openFeatures,
        openDimensions,
        openMaterials,
        openShipping,
        openSustainability,
    } = useProduct();

    const { openPopup } = useUI();

    function handleOpen() {
        openPopup();
        switch (infoName) {
            case "Features":
                openFeatures();
                break;
            case "Materials & technologies":
                openMaterials();
                break;
            case "Sustainability":
                openSustainability();
                break;
            case "Dimensions":
                openDimensions();
                break;
            case "Shipping info":
                openShipping();
                break;

            default:
                break;
        }
    }
    return (
        <InfoBox>
            <InfoBtn
                type="button"
                whileHover="hover"
                onClick={() => {
                    handleOpen();
                }}
            >
                <motion.span
                    variants={textMotion}
                    style={{ transformOrigin: "center bottom" }}
                >
                    {infoName}
                </motion.span>
                <motion.div variants={svgMotion}>
                    <Plus />
                </motion.div>
            </InfoBtn>
        </InfoBox>
    );
};

interface Props {
    hasFeatures: boolean;
    hasSustainability: boolean;
    hasMaterials: boolean;
    hasDimensions: boolean;
    hasShipping: boolean;
}

const ProductInformation: FC<Props> = ({
    hasFeatures,
    hasSustainability,
    hasMaterials,
    hasDimensions,
    hasShipping,
}) => {
    return (
        <Root>
            <List>
                <dt>Product Information</dt>
                {hasFeatures && <Info infoName="Features" />}
                {hasMaterials && <Info infoName="Materials & technologies" />}
                {hasSustainability && <Info infoName="Sustainability" />}
                {hasDimensions && <Info infoName="Dimensions" />}
                {hasShipping && <Info infoName="Shipping info" />}
            </List>
            <div>
                <HelpCard text="How can we help you?" />
            </div>
        </Root>
    );
};

export default ProductInformation;
