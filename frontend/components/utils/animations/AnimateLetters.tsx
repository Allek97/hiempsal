/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import { FC } from "react";
import { motion, Variants } from "framer-motion";
import { Type, Version } from "./type";

// eslint-disable-next-line react/prop-types
const Wrapper: FC = ({ children }) => {
    return (
        <span
            className="animated-text-wrapper"
            style={{
                whiteSpace: "nowrap",
                width: "max-content",
                display: "inline-block",
            }}
        >
            {children}
        </span>
    );
};

type Tag = {
    paragraph: string;
    heading1: string;
    heading2: string;
    heading3: string;
};

const tagMap: Tag = {
    paragraph: "p",
    heading1: "h1",
    heading2: "h2",
    heading3: "h3",
};

interface Props {
    text: string;
    type: Type;
    version: Version;
    letterDuration: number;
}

const AnimateLetters: FC<Props> = ({
    type = "heading1",
    text = "",
    version = "slideUp",
    letterDuration = 0.2,
}) => {
    // NOTE Used for big headers
    const slideUpItem: Variants = {
        hidden: {
            y: "200%",
            transition: {
                ease: [0.455, 0.03, 0.515, 0.955],
                duration: letterDuration,
            },
        },
        visible: {
            y: 0,
            transition: {
                ease: [0.455, 0.03, 0.515, 0.955],
                duration: letterDuration,
            },
        },
    };

    // NOTE Used for small font paragraphs
    const fadeInItem: Variants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,

            transition: {
                ease: [0.455, 0.03, 0.515, 0.955],
                duration: letterDuration,
            },
        },
    };
    // NOTE Used for small font paragraphs
    const slideFadeItem: Variants = {
        hidden: {
            opacity: 0,
            y: "0.2em",
        },
        visible: {
            opacity: 1,
            y: "0em",
            transition: {
                ease: [0.455, 0.03, 0.515, 0.955],
                duration: 0.15,
            },
        },
    };

    const splitWords: string[] = text.split(" ");

    const words: string[][] = [];

    splitWords.forEach((word) => words.push(word.split("")));

    words.map((word) => word.push("\u00A0"));

    const Tag = (tagMap as any)[type];

    const animationVariant = () => {
        switch (version) {
            case "fadeIn":
                return fadeInItem;
            case "slideUp":
                return slideUpItem;
            case "slideFade":
                return slideFadeItem;
            default:
                return slideUpItem;
        }
    };

    return (
        <Tag style={{ whiteSpace: "normal" }}>
            {words.map((word, index) => {
                return (
                    <Wrapper key={index}>
                        {word.flat().map((element, elementIdx) => {
                            return (
                                <span
                                    style={{
                                        display: "inline-block",
                                        overflow: "hidden",
                                    }}
                                    key={elementIdx}
                                >
                                    <motion.span
                                        style={{ display: "inline-block" }}
                                        variants={animationVariant()}
                                    >
                                        {element}
                                    </motion.span>
                                </span>
                            );
                        })}
                    </Wrapper>
                );
            })}
        </Tag>
    );
};

export default AnimateLetters;
