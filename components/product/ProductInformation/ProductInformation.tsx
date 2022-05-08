import { FC } from "react";
import { motion, Variants } from "framer-motion";

import { Plus } from "@components/icons";
import { useUI } from "@components/ui/context";
import { useProductInfo } from "../context";

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
    } = useProductInfo();

    const { openPopup } = useUI();

    function handleOpen() {
        switch (infoName) {
            case "Features":
                openPopup();
                openFeatures();
                break;
            case "Materials & technologies":
                openPopup();
                openMaterials();
                break;
            case "Sustainability":
                openPopup();
                openSustainability();
                break;
            case "Dimensions":
                openPopup();
                openDimensions();
                break;
            case "Shipping info":
                openPopup();
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
