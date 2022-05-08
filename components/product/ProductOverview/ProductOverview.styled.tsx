import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

const textSizeMain = css`
    ${tw`font-size[13px] line-height[1.3em] letter-spacing[-0.04em]
    lg:(font-size[11.25px])
    2lg:font-size[1vw]`}

    ${tw`2xl:font-size[15px]`}
`;

const textSizeAction = css`
    ${tw`font-size[14.5px] line-height[1.3em] tracking-tighter font-semibold
    md:(font-size[12px] line-height[1.1em])
    lg:(font-size[11.25px] letter-spacing[-0.06em])
    2lg:font-size[1vw]`}

    ${tw`2xl:font-size[15px]`}
`;

export const Root = styled(motion.div)`
    ${tw`grid items-center grid-template-columns[minmax(auto,50%) minmax(auto,50%)]
    w-full height[4rem] border-radius[3px] bg-primary
    md:(grid-template-columns[minmax(0,auto) minmax(100px,auto)])
    lg:(height[calc(1.5rem + 2.4vw)])`}

    /* transition: transform .5s cubic-bezier(.19,1,.22,1),background .4s cubic-bezier(.19,1,.22,1) .2s; */
    -webkit-clip-path: polygon(95% 0, 0 0, 0 100%, 100% 100%, 100% 10%);
    clip-path: polygon(95% 0, 0 0, 0 100%, 100% 100%, 100% 10%);

    & > button {
        ${tw`height[4rem]
        lg:(height[calc(1.5rem + 2.4vw)])`}
    }
`;

export const ImageWrapper = styled.div`
    ${tw`relative width[11vw] min-width[9.6vw] margin[0 1.5vw]
    md:(width[7.2vw] min-width[5.7vw])
    lg:(width[calc(1rem + 2.4vw)] min-width[calc(1rem + 2.4vw)] margin[0 0.2rem])`}
`;

export const ProductInfo = styled.div`
    ${tw`relative max-width[65%] text-primary padding[0.5em 0]
    lg:(max-width[70%] margin-right[2.6666666667vw])`}

    ${textSizeMain}

    h3 {
        ${tw`overflow-ellipsis overflow-hidden whitespace-nowrap`}
    }

    span {
        ${tw`tracking-tighter`}
    }
`;

export const ProductAction = styled.div`
    ${tw`relative w-full h-full`}

    &::before {
        ${tw`content absolute top-1/2 left-0 height[calc(100% - 15px)]`}

        transform: translateY(-50%);
        border-left: 2px solid #f0f0f0;
    }
`;

export const ActionButton = styled.button`
    ${tw`relative inline-block h-full w-full
    text-primary bg-transparent`}

    ${textSizeMain}

    box-shadow: 0.785217px 0.785217px 3.14087px rgb(0 0 0 / 28%);
    transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1),
        box-shadow 0.3s cubic-bezier(0.19, 1, 0.22, 1),
        color 0.3s cubic-bezier(0.19, 1, 0.22, 1),
        background 0.3s cubic-bezier(0.19, 1, 0.22, 1);

    & > span {
        ${tw`flex items-center justify-center gap[9px] grid-gap[9px] w-full padding[0 16px]
        whitespace-nowrap`}

        ${textSizeAction}

        svg {
            fill: #e00b25;
            width: 16px;
        }
    }
`;
