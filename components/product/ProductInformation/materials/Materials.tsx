import styled from "styled-components";
import tw from "twin.macro";
import { ButtonHTMLAttributes, FC, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { Plus } from "@components/icons";
import { ProductMaterials } from "@framework/types/product";

import { Container, Header, Item } from "../commun";
import { ListBtn } from "./Materials.styled";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    isOpen?: boolean;
}

const Wrapper = styled.div`
    p {
        ${tw`width[65%]`}
    }
    span {
        ${tw`width[35%]`}
    }
`;

const MaterialButton: FC<BtnProps> = ({ title, isOpen = false, onClick }) => {
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
        <ListBtn
            type="button"
            whileHover="hover"
            $isOpen={isOpen}
            onClick={onClick}
        >
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

interface Props {
    materials: ProductMaterials;
}

const Materials: FC<Props> = ({ materials }) => {
    const { technologies, productCare, materialComposition } = materials;

    const [materialState, setMaterialState] = useState<Material>({});
    // NOTE Use useReducer
    function handleMaterialState(myMaterial: string) {
        const newState: Material = { ...materialState };

        newState[myMaterial] =
            newState[myMaterial] === undefined ? true : !newState[myMaterial];
        Object.keys(newState).forEach((material) => {
            if (material !== myMaterial) newState[material] = false;
        });

        setMaterialState(newState);
    }

    const contentMotion: Variants = {
        hidden: { height: 0 },
        visible: {
            height: "auto",
            transition: {
                duration: 0.3,
                delay: 0.2,
            },
        },
        exit: {
            height: 0,
            opacity: 0,
            overflowY: "hidden",
            transition: {
                duration: 0.3,
                delay: 0,
                opacity: { duration: 0, delay: 0 },
            },
        },
    };

    return (
        <Container>
            <Header title="Materials & technologies" />
            <motion.ul
                className="block w-full h-full"
                exit={{ opacity: 0, transition: { duration: 0 } }}
            >
                <motion.li className="overflow-hidden">
                    <MaterialButton
                        title="Technologies"
                        onClick={() => handleMaterialState("technologies")}
                        isOpen={materialState.technologies ?? false}
                    />
                    <AnimatePresence>
                        {materialState.technologies && (
                            <motion.ul
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={contentMotion}
                            >
                                {technologies?.features &&
                                    Object.entries(technologies?.features).map(
                                        ([feature, value]) => (
                                            <Item
                                                title={value.description}
                                                content={value.content}
                                                key={feature}
                                                layout="B"
                                            />
                                        )
                                    )}
                                {technologies?.descriptions?.map(
                                    (description) => (
                                        <Item
                                            content={description}
                                            key={description}
                                            layout="B"
                                        />
                                    )
                                )}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </motion.li>
                <motion.li className="overflow-hidden">
                    <MaterialButton
                        title="Product Care"
                        onClick={() => handleMaterialState("productCare")}
                        isOpen={materialState.productCare ?? false}
                    />
                    <AnimatePresence>
                        {materialState.productCare && (
                            <motion.ul
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={contentMotion}
                            >
                                {productCare?.features &&
                                    Object.entries(productCare?.features).map(
                                        ([feature, value]) => (
                                            <Item
                                                title={value.description}
                                                content={value.content}
                                                key={feature}
                                                layout="B"
                                            />
                                        )
                                    )}
                                {productCare?.descriptions?.map(
                                    (description) => (
                                        <Item
                                            content={description}
                                            key={description}
                                            layout="B"
                                        />
                                    )
                                )}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </motion.li>
                <motion.li className="overflow-hidden">
                    <MaterialButton
                        title="Material composition"
                        onClick={() =>
                            handleMaterialState("materialComposition")
                        }
                        isOpen={materialState.materialComposition ?? false}
                    />
                    <AnimatePresence>
                        {materialState.materialComposition && (
                            <motion.ul
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={contentMotion}
                            >
                                {materialComposition?.features &&
                                    Object.entries(
                                        materialComposition?.features
                                    ).map(([feature, value]) => (
                                        <Wrapper key={feature}>
                                            <Item
                                                title={value.description}
                                                content={value.content}
                                                layout="B"
                                            />
                                        </Wrapper>
                                    ))}
                                {materialComposition?.descriptions?.map(
                                    (description) => (
                                        <Item
                                            content={description}
                                            key={description}
                                            layout="B"
                                        />
                                    )
                                )}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </motion.li>
            </motion.ul>
        </Container>
    );
};

export default Materials;
