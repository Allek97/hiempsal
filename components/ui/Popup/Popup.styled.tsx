import styled from "@emotion/styled";
import customScroll from "@styles/customScroll.styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const Root = styled.aside`
    ${tw`relative block`}
`;

export const Overlay = styled.div`
    ${tw`fixed inset-0 z-index[95] bg-accents-9 opacity-40 pointer-events-auto`}

    cursor: url(/close-cursor-image.svg), pointer;
`;

export const Container = styled(motion.main)`
    ${tw`fixed z-index[95] bottom-10 right[15px]
    border-radius[5px] bg-primary overflow-y-auto -webkit-overflow-scrolling[touch]
    lg:(right[2.6666666667vw] bottom[1.3333333333vw] border-radius[0px])`}

    // Dimensions
    ${tw`(width[calc(100% - 30px)]) 
    lg:width[30vw]
    2lg:width[28vw]
    4xl:width[22vw]`}



    /* filter: drop-shadow(rgba(0, 0, 0, 0.15) 1px 1px 3px); */
    /* border-top-left-radius: 1.5rem; */
    @media only screen and (min-width: 64em) {
        clip-path: polygon(4.5% 0, 100% 0, 100% 100%, 0 100%, 0 3%);
        ${customScroll}
    }
`;
