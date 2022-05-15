import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const Box = styled(motion.div)`
    ${tw`block w-full h-full padding-left[4vw] mb-16
    lg:padding[1.3333333333vw 0 0 1.3333333333vw]
    4xl:padding[1vw 0 0 1vw]`}
`;

export const Table = styled.div`
    ${tw`w-full overflow-hidden table-layout[fixed] 
    border-collapse[collapse] border-spacing[0]`}
`;

export const Head = styled(motion.div)`
    ${tw`relative z-20 float-left width[22.8vw]
    md:width[16vw]
    lg:width[7.3333333333vw]
    4xl:width[5.5vw]`}

    margin-top: 1px;
    margin-bottom: 1px;

    /* box-shadow: 0 0 49px rgb(0 0 0 / 7%), 0 0 22.05px rgb(0 0 0 / 12%),
        0 0 9.8px rgb(0 0 0 / 12%), 0 0 4.9px rgb(0 0 0 / 9%); */
    border-top: 2px solid #cdcdcd;
`;

export const Body = styled(motion.div)`
    ${tw`relative flex float-right width[calc(100% - 22.8vw)] cursor[grab]
    md:width[calc(100% - 16vw)]
    lg:width[calc(100% - 7.3333333333vw)]
    4xl:width[calc(100% - 5.5vw)]`}

    overflow-x: hidden;
    touch-action: pan-y;
    border-top: 2px solid #cdcdcd;

    margin-top: 1px;
    margin-bottom: 1px;
`;

export const TR = styled.div`
    ${tw`flex-grow-0`}

    &:nth-of-type(odd) {
        background: #f8f7f7;
    }
`;
export const TH = styled.div`
    ${tw`flex items-center height[14vw] font-light
    whitespace-pre-line hyphens[auto]
    md:(height[10vw] min-height[12vw])
    lg:(height[4.1333vw] min-height[5.333vw])
    4xl:(height[3.1vw] min-height[0])`}

    ${({ theme }) => theme.textSize.textSizeSmall}
    
    ${tw`width[22.8vw] md:width[16vw] text-align[center]
    lg:width[7.3333333333vw]
    2xl:font-size[14px]
    4xl:width[5.5vw]`}

    border-bottom: 2px solid hsla(0, 0%, 80%, 0.45);
`;
