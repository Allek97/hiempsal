import { css } from "@emotion/react";
import styled from "@emotion/styled";
import customScroll from "@styles/customScroll.styled";
import tw from "twin.macro";

interface ProductVariantColorProps {
    isSelected?: boolean;
}

export const Root = styled.aside`
    ${tw`relative block`}
`;

export const Overlay = styled.div`
    ${tw`fixed inset-0 z-index[90] bg-accents-9 opacity-40`}
`;

export const Container = styled.section`
    ${tw`fixed z-index[95] bottom-9 right[4vw] width[94vw] height[80%] bg-primary
    rounded-md overflow-y-scroll`}

    border-top-right-radius: 2rem;
    ${customScroll}
`;

export const Content = styled.div`
    ${tw`flex flex-col py-8 px-4`}
`;

export const ProductInfo = styled.div`
    ${tw`flex justify-between items-center mb-12 font-size[17px] tracking-tighter`}

    h1 {
        ${tw`mr-3`}
    }

    span {
        ${tw`font-size[14.5px] text-accents-9`}
    }
`;

///////////////////////////////////////////////////
/// NOTE Product color variants
///////////////////////////////////////////////////

export const ProductColor = styled.section`
    ${tw`text-xs tracking-tighter text-accents-7`}

    h3 {
        ${tw`mb-4`}
    }
`;
export const ProductVariantList = styled.div`
    ${tw`grid grid-cols-3 justify-between items-center gap-1.5 mb-6`}
`;
export const ProductVariantColor = styled.article<ProductVariantColorProps>`
    ${tw`flex flex-col items-center justify-start text-center flex-1 
    border border-color[#f0f0f0] border-radius[3px] bg-primary cursor-pointer`};
    min-height: 9.5rem;
    transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
    // width: calc(33.333333333%);

    h2 {
        ${tw`mx-2 font-size[13px] text-accents-8`}
    }

    ${(props) =>
        props.isSelected &&
        css`
            background-color: #f0f0f0;
            box-shadow: inset 0 0 0 2px #676767be;
            cursor: auto;
        `}

    &:hover {
        background-color: #f0f0f0;
    }

    &:active {
        box-shadow: inset 0 0 0 2.5px #676767be;
    }
`;
export const ImageVariantWrapper = styled.div`
    ${tw`width[65%] p-1`}
`;

///////////////////////////////////////////////////
/// NOTE Product size variants
///////////////////////////////////////////////////

export const ProductSize = styled(ProductColor)``;
export const ProductVariantSize = styled(ProductVariantColor)`
    justify-content: center;
    min-height: 4rem;
`;
