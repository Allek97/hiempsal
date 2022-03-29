/* eslint-disable react/no-array-index-key */
import { FC } from "react";
import { motion, Variants } from "framer-motion";

// Word wrapper
const Wrapper: FC = ({ children }) => {
    // We'll do this to prevent wrapping of words using CSS
    return <span className="animated-text-wrapper">{children}</span>;
};

type TagMap = {
    paragraph: "p";
    heading1: "h1";
    heading2: "h2";
};

// Map API "type" vaules to JSX tag names
const tagMap: TagMap = {
    paragraph: "p",
    heading1: "h1",
    heading2: "h2",
};

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations

export interface AnimatedTextProps {
    type: "heading1" | "heading2" | "paragraph";
    text: string;
}

const AnimatedCharacters = ({ type, text }: AnimatedTextProps) => {
    // Framer Motion variant object, for controlling animation
    const item: Variants = {
        hidden: {
            y: "200%",
            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.2 },
        },
        visible: {
            y: 0,
            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.2 },
        },
    };

    //  Split each word of text into an array
    const splitWords: string[] = text.split(" ");

    // Create storage array
    const words: string[][] = [];

    // Push each word into words array
    [...splitWords].forEach((word) => words.push(word.split("")));

    // Add a space ("\u00A0") to the end of each word
    words.map((word) => word.push("\u00A0"));

    // Get the tag name from tagMap
    const Tag = tagMap[type];

    console.log(words);

    return (
        <Tag
            style={{ lineHeight: "normal", marginTop: "3px", fontWeight: 500 }}
        >
            {words.map((word, index) => {
                return (
                    // Wrap each word in the Wrapper component
                    <Wrapper key={index}>
                        {words[index].flat().map((element, elementIdx) => {
                            return (
                                <span
                                    className="inline-block overflow-hidden"
                                    key={elementIdx}
                                >
                                    <motion.span
                                        className="inline-block"
                                        variants={item}
                                    >
                                        {element}
                                    </motion.span>
                                </span>
                            );
                        })}
                    </Wrapper>
                );
            })}
            {/* {} */}
        </Tag>
    );
};

export default AnimatedCharacters;
