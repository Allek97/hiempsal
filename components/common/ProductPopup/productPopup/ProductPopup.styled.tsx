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
    lg:mt-10
    2xl:font-size[12.5px]`}

    margin-bottom: 4rem;

    span {
        margin-bottom: 0.5rem;
    }
`;
