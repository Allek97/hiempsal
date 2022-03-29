import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const mainTextSize = css`
    ${tw`font-size[16.5px] letter-spacing[-0.06em]
    lg:font-size[13.5px]
    2lg:font-size[1.2vw]`}

    ${tw`2xl:font-size[18px]`}
`;

export const CartBtnWrapper = styled.div`
    ${tw`sticky bottom-10 z-index[150] overflow-hidden`}
    ${tw`height[51px] 
    lg:height[3.6vw]
    2xl:height[54px]`}

    & > div {
        ${tw`h-full`}
    }
`;

export const CartBtn = styled(Button)`
    ${tw`relative h-full mx-auto overflow-hidden bg-transparent`}
    ${mainTextSize}
    border-radius: 4px;

    & > div {
        ${tw`absolute left-0 top-0 z-20 w-full h-full background-color[#000]`}

        &:first-of-type {
            &::after {
                ${tw`content absolute right[-20px] top-0 width[30px] height[calc(100% + 20px)] background[#000]`}
                transform: rotate(-15deg);
            }
        }
        &:nth-of-type(2) {
            ${tw`flex justify-center items-center z-10`}
            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    ${tw`bg-accents-9`}
                }
            }
        }
    }
`;
