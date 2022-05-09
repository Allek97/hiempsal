import styled from "@emotion/styled";
import tw from "twin.macro";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

const titleSize = css`
    ${tw`font-size[20px] tracking-tighter line-height[1.1em]
    lg:(font-size[17.25px] letter-spacing[-0.06em])
    2lg:font-size[1.53333333333333vw]`}

    ${tw`2xl:font-size[23px]`}
`;

const featureText = css`
    ${tw`font-size[11px] tracking-tighter line-height[1.2em]
    lg:(font-size[11.25px] letter-spacing[-.04em] line-height[1.3em])
    2lg:font-size[1vw]`}

    ${tw`2xl:font-size[15px]`}
`;

export const Root = styled(motion.div)`
    ${tw`w-full h-full max-height[calc(85vh - 4.2rem)] overflow-y-auto bg-white
    md:max-height[calc(75vh - 4.2rem)]
    lg:max-height[calc(85vh - 3.61rem)]`}

    border-bottom: 2px solid #f0f0f0;
    border-radius: 6px 0 0 0;

    /* -webkit-clip-path: polygon(95% 0, 0 0, 0 100%, 100% 100%, 100% 29%); */
    clip-path: polygon(95% 0, 0 0, 0 100%, 100% 100%, 100% 1.3rem);
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

    ${featureText}

    border-bottom: 1px solid hsla(0,0%,60%,.3);
`;
