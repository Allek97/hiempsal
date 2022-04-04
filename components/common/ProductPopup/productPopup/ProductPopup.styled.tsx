import styled from "@emotion/styled";
import customScroll from "@styles/customScroll.styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const Container = styled(motion.div)`
    ${tw`overflow-y-auto -webkit-overflow-scrolling[touch] 
    bg-white border-radius[5px] 
    lg:border-radius[6px]`}

    // heights 

    ${tw`height[calc(90vh - 4.2rem)] 
    md:height[calc(85vh - 4.2rem)] 
    lg:height[calc(90vh - 4.2rem)] 
    2xl:height[calc(85vh - 4.2rem)]`}


    @media only screen and (min-width: 64em) {
        ${customScroll}
    }
`;

export const Paddings = styled.div`
    ${tw`padding-left[4vw] padding-right[4vw]
        md:(padding-left[3vw] padding-right[3vw]) 
        lg:(padding-left[1.333333333333333vw] padding-right[1.333333333333333vw])`}
`;
