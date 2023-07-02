/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */

import { motion, Variants } from "framer-motion";
import { FC, Ref } from "react";
import AnimateLetters from "./AnimateLetters";
import { Type, Version } from "./type";

interface Props {
    isAnimate?: boolean;
    text?: string;
    type?: Type;
    version?: Version;
    staggerValue?: number;
    refAnimation: Ref<HTMLDivElement>;
    delayValue?: number;
    letterDuration?: number;
}

const AnimateText: FC<Props> = ({
    isAnimate = true,
    type = "heading1",
    text = "",
    staggerValue = 0.025,
    delayValue = 0,
    version = "slideUp",
    letterDuration = 0.2,
    refAnimation,
    // eslint-disable-next-line react/prop-types
}) => {
    // Placeholder text data, as if from API
    const placeholderText: Array<{ type: Type; text: string }> = [
        {
            type: type,
            text: text,
        },
    ];

    const container: Variants = {
        visible: {
            transition: {
                staggerChildren: staggerValue,
                delayChildren: delayValue ?? 0,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate={isAnimate ? "visible" : "hidden"}
            variants={container}
            ref={refAnimation}
            style={{ width: "100%" }}
        >
            <div>
                {placeholderText.map((item, index) => {
                    return (
                        <AnimateLetters
                            {...item}
                            key={index}
                            version={version}
                            letterDuration={letterDuration}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
};

export default AnimateText;
