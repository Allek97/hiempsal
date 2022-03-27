import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import tw from "twin.macro";

const mainTextSize = css`
    ${tw`font-size[16.5px] tracking-tighter
    lg:font-size[13.5px]
    2lg:font-size[1.2vw]`}

    ${tw`2xl:font-size[18px]`}
`;

export const Container = styled.div`
    ${tw`padding[7.6vw 4vw]
    md:padding[3vw]
    lg:padding[2rem 1.333333333333333vw]`}
`;
export const Content = styled.div`
    ${tw`relative flex flex-col`}
`;

export const ProductInfo = styled.div`
    ${tw`flex justify-between items-center mb-12 cursor-pointer
    lg:justify-start`}

    ${mainTextSize}

    h1 {
        ${tw`mr-3`}
    }

    span {
        ${tw`font-size[13px]
        lg:font-size[14px]`}
    }
`;

///////////////////////////////////////////////////
/// NOTE Product color variants
///////////////////////////////////////////////////

export const VariantOptionContainer = styled.section`
    ${tw`text-xs tracking-tighter text-accents-7
    xl:font-size[13px]`}

    h3 {
        ${tw`mb-4`}
    }
`;
export const ProductVariantList = styled.div`
    ${tw`grid grid-cols-3 grid-auto-rows[1fr] justify-between items-center gap-1.5 mb-6
    md:grid-cols-4
    lg:grid-cols-3`}
`;

///////////////////////////////////////////////////
/// NOTE Product policy may add matafields in storefrontAPI
///////////////////////////////////////////////////

export const ProductPolicy = styled.div`
    ${tw`flex items-center justify-center flex-col w-full font-size[11px] leading-3 tracking-tighter
    2xl:font-size[12.5px]`}

    margin-bottom: 4rem;

    span {
        margin-bottom: 0.5rem;
    }
`;

export const CartBtnWrapper = styled.div`
    ${tw`sticky bottom-10 z-index[150] overflow-hidden bg-red`}
    ${tw`height[51px] 
    lg:height[3.6vw]
    2xl:height[54px]`}

    & > div {
        ${tw`h-full`}
    }
`;

export const CartButton = styled(Button)`
    ${tw`relative h-full mx-auto overflow-hidden capitalize`}
    ${mainTextSize}
    border-radius: 4px;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${tw`bg-accents-9 text-secondary shadow-md`}
        }
    }

    &:active {
        ${tw`bg-accents-9`}
    }

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
        }
    }
`;
