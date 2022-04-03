import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface UtilProps {
    $isCartBtn?: boolean;
}

const textSizeMain = css`
    ${tw`font-size[13px] line-height[1.3em] tracking-tighter 
    lg:(font-size[11.25px] font-semibold)
    2lg:font-size[1vw]`}

    ${tw`2xl:font-size[15px]`}
`;
const textSizeSecondary = css`
    ${tw`font-size[10px] line-height[1.2em] tracking-tighter 
    lg:font-size[9px]
    2lg:font-size[0.8vw]`}

    ${tw`2xl:font-size[12px]`}
`;
const textSizeBtn = css`
    ${tw`font-size[13px] line-height[1em] tracking-tighter 
    lg:(font-size[14px] line-height[1.5em])`}
`;

export const Root = styled.div`
    ${tw`flex flex-col`}

    ${tw`padding-top[5vw] padding-bottom[4vw] 
        md:(padding-top[3vw] padding-bottom[3vw])
        lg:(padding-top[0.8vw] padding-bottom[calc(2vw / 3)])`}
`;

export const ProductInfo = styled.div`
    ${tw`flex items-center`}

    & > div:nth-of-type(2) {
        ${tw`flex flex-col justify-between h-full w-full margin-left[1em]`}

        h4 {
            ${tw`mb-1 max-width[85%]`}
            ${textSizeMain}
        }

        span {
            ${textSizeSecondary}
        }
    }
`;

export const ImageWrapper = styled.div`
    ${tw`relative h-full width[27.5vw] p-0
    lg:width[3.125rem]`}

    background-color: white;
`;

export const UtilWrapper = styled.div`
    ${tw`flex padding[1vw 0]
    lg:padding[calc(1vw / 3) 0]`}

    & > a {
        ${tw`w-full margin[0.25em]`}
    }
`;

export const UtilBtn = styled(Button)<UtilProps>`
    ${tw`padding[0.9em] margin[0.25em]`}

    ${textSizeBtn}

    ${({ $isCartBtn }) =>
        $isCartBtn &&
        css`
            ${tw`bg-white text-primary m-0`}
            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    ${tw`bg-secondary text-secondary`}
                }
            }

            @media (hover: hover) and (pointer: fine) {
                &:active {
                    ${tw`bg-accents-2 text-primary`}
                }
            }

            &:focus {
                ${tw`outline-none`}
            }
        `}
`;
