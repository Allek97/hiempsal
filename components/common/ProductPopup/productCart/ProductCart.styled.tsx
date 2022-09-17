import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const mainTextSize = css`
    ${tw`font-size[16.5px] tracking-tighter
    lg:font-size[13.5px]
    2lg:font-size[1.2vw]`}

    ${tw`2xl:font-size[18px]`}
`;

export const Form = styled.form`
    ${tw`padding-top[7.6vw] padding-bottom[7.6vw] 
        md:(padding-top[3vw] padding-bottom[3vw])
        lg:(pb-8 pt-6)`}
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

interface ProductVariantListProps {
    isLong?: boolean;
}
export const ProductVariantList = styled.div<ProductVariantListProps>`
    ${tw`grid grid-cols-3 grid-auto-rows[1fr] justify-between items-center gap-1.5 mb-6
    md:grid-cols-4
    lg:grid-cols-3`}

    ${({ isLong }) =>
        isLong &&
        css`
            ${tw`flex flex-col`}
        `}
`;

///////////////////////////////////////////////////
/// NOTE Product policy may add matafields in storefrontAPI
///////////////////////////////////////////////////

export const ProductPolicy = styled.div`
    ${tw`flex items-center justify-center flex-col w-full font-size[11px] leading-3 tracking-tighter
    lg:mt-10
    2xl:font-size[12.5px]`}

    margin-bottom: 4rem;

    span {
        margin-bottom: 0.5rem;
    }
`;

//////////////////////  OSING

export const CloseWrapper = styled.div`
    ${tw`w-3.5 cursor-pointer z-10 ml-auto margin-right[0.75vw]`}

    @media (hover:hover) and (pointer: fine) {
        &:hover svg {
            transition: fill 0.3s;
            fill: #e00b25;
            cursor: pointer;
        }
    }
`;
