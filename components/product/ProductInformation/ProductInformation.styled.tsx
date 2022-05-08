import styled from "@emotion/styled";
import tw from "twin.macro";
import { css } from "@emotion/react";
import { motion } from "framer-motion";

const titleSize = css`
    ${tw`font-size[17px] tracking-tighter line-height[1.15em] font-semibold
    lg:(font-size[13.5px] line-height[1.1em])
    2lg:font-size[1.2vw]`}

    ${tw`2xl:font-size[18px]`}
`;

const infoSize = css`
    ${tw`font-size[20px] tracking-tighter line-height[1.1em]
    lg:(font-size[16.5px] letter-spacing[-0.06em] line-height[1em])
    2lg:font-size[1.4666666667vw]`}

    ${tw`2xl:font-size[22px]`}
`;

export const Root = styled.dl`
    ${tw`flex flex-col
    lg:width[30.6666666667vw]
    4xl:width[23vw]`}

    & > div {
        ${tw`margin-top[7.2vw]
        md:mt-8`}
    }
`;

export const List = styled.dl`
    dt {
        ${tw`margin-bottom[7.2vw]
        md:mb-8`}
        ${titleSize}
    }
`;

export const InfoBox = styled(motion.dd)`
    ${tw`relative w-full`}

    &::before {
        ${tw`content absolute top-0 bg-secondary w-full h-0.5 `}
    }

    &:last-of-type {
        &::after {
            ${tw`content absolute bottom-0 bg-secondary w-full h-0.5 `}
        }
    }
`;

const infoBtnPaddings = css`
    ${tw`padding[4vw 0]
    md:padding[2vw 0]
    lg:padding[1.33333333333vw 0]
    4xl:padding[1vw 0]`}
`;

export const InfoBtn = styled(motion.button)`
    ${tw`flex justify-between w-full`}

    ${infoBtnPaddings}

    svg {
        ${tw`w-5 h-5 cursor-pointer`}
    }

    span {
        ${infoSize}
    }
`;
