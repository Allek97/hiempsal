import { useProduct } from "@components/product/context";
import styled from "@emotion/styled";
import customScroll from "@styles/customScroll.styled";
import { motion, Variants } from "framer-motion";
import { FC } from "react";
import tw from "twin.macro";

export const Root = styled(motion.div)`
    ${tw`relative max-height[calc(85vh - 4.2rem)] bg-white overflow-y-auto
    md:max-height[calc(75vh - 4.2rem)] height[min-content]
    lg:max-height[calc(85vh - 3.61rem)]`}

    border-bottom: 2px solid #f0f0f0;
    border-radius: 6px 0 0 0;

    /* -webkit-clip-path: polygon(95% 0, 0 0, 0 100%, 100% 100%, 100% 29%); */
    clip-path: polygon(97% 0, 0 0, 0 100%, 100% 100%, 100% 1.1rem);
    ${customScroll}
`;

export const containerMotion = (exitCondition: boolean): Variants => ({
    hidden: { height: 0 },
    visible: {
        height: "auto",
        transition: {
            duration: 0.45,
            delay: 0.1,
        },
    },
    exit: {
        height: 0,
        transition: { duration: exitCondition ? 0.35 : 0, delay: 0 },
    },
});

const Container: FC = ({ children }) => {
    const { isProductOverviewOpen } = useProduct();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerMotion(isProductOverviewOpen)}
            exit="exit"
            key="features"
        >
            <Root>{children}</Root>
        </motion.div>
    );
};

export default Container;
