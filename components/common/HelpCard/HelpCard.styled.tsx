import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

export const textSizeTiny = css`
    ${tw`font-size[10px] line-height[1.2em] letter-spacing[-0.04em] 
    lg:(font-size[9px] line-height[1.3em] letter-spacing[-0.05em])
    2lg:font-size[0.8vw]`}

    ${tw`2xl:font-size[12px]`}
`;

export const HelpCardBox = styled.div`
    ${tw`flex items-center transition 
    font-size[14.5px] cursor-pointer`}

    div:nth-of-type(2) {
        ${tw`flex flex-col leading-6
        2xl:leading-7`}

        span {
            ${tw`w-max`}
        }

        span:nth-of-type(1) {
            ${tw`font-size[13px]
            lg:font-size[14px]`}
        }

        span:nth-of-type(2) {
            ${tw`text-accents-7`}
            ${textSizeTiny}
        }
    }

    &:hover div:nth-of-type(2) {
        span:first-of-type {
            ${tw`transition`}
            transform: skewX(-10deg);
        }
    }
`;
export const HelpCardImage = styled.div`
    ${tw`relative h-10 w-10`}

    margin-right: 0.65vw;
    border-radius: 50%;
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.15));
    overflow: hidden;
`;
