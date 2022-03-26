import { Button } from "@components/ui";
import styled from "@emotion/styled";

import tw from "twin.macro";

export const Content = styled.div`
    ${tw`relative flex flex-col padding[7.6vw 4vw]
    md:padding[3vw]
    lg:padding[2rem 1.333333333333333vw]`}
`;

export const ProductInfo = styled.div`
    ${tw`flex justify-between items-center mb-12 font-size[16px] tracking-tighter cursor-pointer
    lg:justify-start
    xl:font-size[19px]`}

    h1 {
        ${tw`mr-3`}
    }

    span {
        ${tw`font-size[14.5px] text-accents-9
        xl:font-size[16.5px]`}
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
    ${tw`sticky bottom-10 z-index[150] width[90%] mx-auto`}
`;

export const CartButton = styled(Button)`
    ${tw`height[50px] mx-auto overflow-hidden text-lg
    2xl:text-xl`}
    border-radius: 4px;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${tw`bg-accents-9 text-secondary shadow-md`}
        }
    }

    &:active {
        ${tw`bg-accents-9`}
    }
`;
