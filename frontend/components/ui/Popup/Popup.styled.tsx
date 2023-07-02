import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const Root = styled.aside`
    ${tw`relative block overflow-hidden`}
`;

export const Overlay = styled.div`
    ${tw`fixed inset-0 z-index[95] bg-accents-9 opacity-40 pointer-events-auto`}

    cursor: url(/close-cursor-image.svg), pointer;
`;

export const Container = styled(motion.main)`
    ${tw`fixed z-index[95] bottom-10 right[15px] overflow-hidden
    lg:(right[2.6666666667vw] bottom[1.3333333333vw])`}

    // Dimensions
    ${tw`(width[calc(100% - 30px)]) 
    lg:width[30vw]
    2lg:width[28vw]
    4xl:width[22vw]`}

    filter: drop-shadow(rgba(0, 0, 0, 0.15) 1px 1px 3px);
`;
