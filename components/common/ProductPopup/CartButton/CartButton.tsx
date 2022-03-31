import { AnimatedText } from "@components/utils";
import { AnimatedTextProps } from "@components/utils/AnimatedText";
import { motion, Variants } from "framer-motion";

import { FC } from "react";
import { CartBtn, CartBtnWrapper } from "./CartButton.styled";

interface Props {
    isLoading?: boolean;
}

// Variants
const variants1: Variants = {
    loading: { x: "calc(-75% - 30px)" },
    notLoading: { x: "calc(-100% - 30px)" },
};
const variants2: Variants = {
    loading: {
        backgroundColor: "#e2e2e2",
        color: "var(--secondary)",
    },
};
const container: Variants = {
    visible: {
        transition: {
            staggerChildren: 0.025,
        },
    },
};

// Framer props
const boxAnimation1 = {
    initial: { x: "calc(-100% - 30px)" },
    transition: {
        duration: "0.5",
        ease: [0.19, 1, 0.22, 1],
    },
    variants: variants1,
};

const boxAnimation2 = {
    transition: {
        duration: "0.5",
        ease: [0.19, 1, 0.22, 1],
    },
    variants: variants2,
};

const placeholderTextInitial: AnimatedTextProps[] = [
    { type: "heading1", text: "Add to Cart" },
];
const placeholderTextInitialAnimated: AnimatedTextProps[] = [
    { type: "heading1", text: "Adding" },
];

const CartButton: FC<Props> = ({ isLoading = false }) => {
    return (
        <CartBtnWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.35 }}
        >
            <CartBtn type="submit" isHoverActive={false}>
                <motion.div
                    animate={isLoading && "loading"}
                    {...boxAnimation1}
                />
                <motion.div animate={isLoading && "loading"} {...boxAnimation2}>
                    <motion.div
                        initial="visible"
                        animate={isLoading ? "hidden" : "visible"}
                        variants={container}
                        className="flex justify-center items-center absolute left-0 top-0 w-full h-full"
                    >
                        {placeholderTextInitial.map((item) => (
                            <AnimatedText
                                {...item}
                                key={`${item.text}-${item.type}`}
                            />
                        ))}
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate={isLoading ? "visible" : "hidden"}
                        variants={container}
                        className="flex justify-center items-center absolute left-0 top-0 w-full h-full"
                    >
                        {placeholderTextInitialAnimated.map((item) => (
                            <AnimatedText
                                {...item}
                                key={`${item.text}-${item.type}`}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </CartBtn>
        </CartBtnWrapper>
    );
};

CartButton.defaultProps = {
    isLoading: false,
};

export default CartButton;