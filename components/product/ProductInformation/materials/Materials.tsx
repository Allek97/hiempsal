import { ButtonHTMLAttributes, FC, useState } from "react";
import { motion, Variants } from "framer-motion";

import { Plus } from "@components/icons";
import { Container, Header } from "../commun";
import { ListBtn } from "./Materials.styled";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    isOpen?: boolean;
}

const MaterialButton: FC<BtnProps> = ({ title, isOpen = false }) => {
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
        hidden: {
            rotate: "0deg",
        },
        animate: {
            rotate: "90deg",
        },
    };
    return (
        <ListBtn type="button" whileHover="hover">
            <motion.h3
                variants={textMotion}
                style={{ transformOrigin: "center bottom" }}
            >
                {title}
            </motion.h3>
            <motion.span
                initial="hidden"
                animate={isOpen ? "visible" : "hidden"}
                variants={svgMotion}
            >
                <Plus />
            </motion.span>
        </ListBtn>
    );
};

MaterialButton.defaultProps = {
    isOpen: false,
};

type Material = {
    [key: string]: boolean;
};

const Materials: FC = () => {
    const [materialState, setMaterialState] = useState<Material>({});

    function handleMaterialState(myMaterial: string) {
        const newState: Material = { ...materialState };

        newState[myMaterial] =
            newState[myMaterial] === undefined ? true : !newState[myMaterial];
        Object.keys(newState).forEach((material) => {
            if (material !== myMaterial) newState[material] = false;
        });

        setMaterialState(newState);
    }

    return (
        <Container>
            <Header title="Materials & technologies" />
            <motion.ul
                className="block w-full h-full"
                exit={{ opacity: 0, transition: { duration: 0 } }}
            >
                <motion.li onClick={() => handleMaterialState("technologies")}>
                    <MaterialButton
                        title="Technologies"
                        isOpen={materialState.technologies ?? false}
                    />
                    {materialState.technologies && (
                        <ul>
                            <li>Technologies</li>
                        </ul>
                    )}
                </motion.li>
                <motion.li onClick={() => handleMaterialState("productCare")}>
                    <MaterialButton
                        title="Product Care"
                        isOpen={materialState.productCare ?? false}
                    />
                    {materialState.productCare && (
                        <ul>
                            <li>Product Care</li>
                        </ul>
                    )}
                </motion.li>
                <motion.li
                    onClick={() => handleMaterialState("materialComposition")}
                >
                    <MaterialButton
                        title="Material composition"
                        isOpen={materialState.materialComposition ?? false}
                    />
                    {materialState.materialComposition && (
                        <ul>
                            <li>Material composition</li>
                        </ul>
                    )}
                </motion.li>
            </motion.ul>
        </Container>
    );
};

export default Materials;
