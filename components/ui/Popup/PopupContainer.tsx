import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { FC } from "react";
import tw from "twin.macro";

const Container = styled(motion.main)`
    ${tw`fixed z-index[95] bottom-10 right[15px]
    border-radius[5px] bg-primary 
    lg:(right[2.6666666667vw] bottom[1.3333333333vw] border-radius[6px])`}

    // Dimensions
    ${tw`(width[calc(100% - 30px)]) 
    lg:width[30vw]
    2lg:width[28vw]
    4xl:width[22vw]`}

    filter: drop-shadow(rgba(0, 0, 0, 0.15) 1px 1px 3px);
`;

const PopupContainer: FC = ({ children }) => {
    return <Container>{children}</Container>;
};

export default PopupContainer;
