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

export const Root = styled(motion.div)`
    ${tw`w-full h-full overflow-y-auto bg-white`}

    max-height: calc(85vh - 4.2rem);

    border-bottom: 2px solid #f0f0f0;
    border-radius: 6px 0 0 0;

    -webkit-clip-path: polygon(95% 0, 0 0, 0 100%, 100% 100%, 100% 29%);
    clip-path: polygon(95% 0, 0 0, 0 100%, 100% 100%, 100% 29%);
`;

export const Title = styled.section`
    ${tw`relative flex justify-between w-full padding[1em 4vw]
    lg:padding[1em 1.3333333333vw;]`}
    border-bottom: 2px solid hsla(0,0%,60%,.3);

    h1 {
        ${titleSize}
    }
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
