import { useProductInfo } from "@components/product/context";
import styled from "@emotion/styled";
import { motion, Variants } from "framer-motion";
import { FC } from "react";
import tw from "twin.macro";

export const Root = styled(motion.div)`
    ${tw`w-full h-full max-height[calc(85vh - 4.2rem)] overflow-y-auto bg-white
    md:max-height[calc(75vh - 4.2rem)]
    lg:max-height[calc(85vh - 3.61rem)]`}

    border-bottom: 2px solid #f0f0f0;
    border-radius: 6px 0 0 0;

    /* -webkit-clip-path: polygon(95% 0, 0 0, 0 100%, 100% 100%, 100% 29%); */
    clip-path: polygon(97% 0, 0 0, 0 100%, 100% 100%, 100% 1.1rem);
`;

const Container: FC = ({ children }) => {
    const { isProductOverviewOpen } = useProductInfo();

    const containerMotion: Variants = {
        hidden: { height: 0 },
        visible: { height: "auto", transition: { duration: 0.4, delay: 0.1 } },
        exit: {
            height: 0,
            overflowY: "hidden",
            transition: { duration: isProductOverviewOpen ? 0.3 : 0 },
        },
    };

    return (
        <Root
            initial="hidden"
            animate="visible"
            variants={containerMotion}
            exit="exit"
            key="features"
        >
            {children}
        </Root>
    );
};

export default Container;
