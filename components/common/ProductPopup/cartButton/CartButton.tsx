import { ButtonHTMLAttributes, FC } from "react";
import { motion, Variants } from "framer-motion";

import { AnimatedText } from "@components/utils";
import { AnimatedTextProps } from "@components/utils/animations/AnimatedText";

import { CartBtn, CartBtnWrapper } from "./CartButton.styled";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean;
    preText: string;
    loadingText: string;
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
    notLoading: {
        backgroundColor: "black",
        color: "var(--primary)",
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
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
    },
    variants: variants1,
};

const boxAnimation2 = {
    transition: {
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
    },
    variants: variants2,
};

const CartButton: FC<Props> = ({
    isLoading,
    preText,
    loadingText,
    onClick,
}) => {
    const placeholderTextInitial: AnimatedTextProps[] = [
        { type: "heading1", text: preText },
    ];
    const placeholderTextInitialAnimated: AnimatedTextProps[] = [
        { type: "heading1", text: loadingText },
    ];

    return (
        <CartBtnWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.35 }}
            data-testid="cart-button"
        >
            <CartBtn
                type="submit"
                role="button"
                isHoverActive={false}
                onClick={onClick}
            >
                <motion.div
                    animate={isLoading ? "loading" : "notLoading"}
                    {...boxAnimation1}
                    data-testid="motion-x"
                />
                <motion.div
                    animate={isLoading ? "loading" : "notLoading"}
                    {...boxAnimation2}
                >
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

export default CartButton;
