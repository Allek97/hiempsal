import styled from "@emotion/styled";
import tw from "twin.macro";
import { motion } from "framer-motion";
import { contentSize, titleSize } from "../commun/typography";

export const Root = styled(motion.div)`
    ${tw`w-full h-full max-height[calc(85vh - 4.2rem)] overflow-y-auto bg-white
    md:max-height[calc(75vh - 4.2rem)]
    lg:max-height[calc(85vh - 3.61rem)]`}

    border-bottom: 2px solid #f0f0f0;
    border-radius: 6px 0 0 0;

    /* -webkit-clip-path: polygon(95% 0, 0 0, 0 100%, 100% 100%, 100% 29%); */
    clip-path: polygon(97% 0, 0 0, 0 100%, 100% 100%, 100% 1.1rem);
`;

export const Title = styled.section`
    ${tw`relative flex justify-between w-full padding[1em 4vw] 
    lg:padding[1em 1.3333333333vw]`}
    border-bottom: 2px solid hsla(0,0%,60%,.3);

    ${titleSize}
`;

export const CloseBtn = styled.button`
    ${tw`display[none] 
    lg:(absolute top-1/2 right[0.6666666667vw]
     grid place-content-center w-10 h-10)`}
    transform: translateY(-50%);

    svg {
        ${tw`w-4 h-14`}
    }
`;

export const Feature = styled.li`
    ${tw`flex justify-between items-center  
    padding[4vw 0] width[calc(100% - 8vw)] mx-auto 
    md:padding[3vw 0]
    lg:(padding[2vw 0] width[calc(100% - 2.6666666667vw)])`}

    ${contentSize}

    border-bottom: 1px solid hsla(0,0%,60%,.3);
`;
