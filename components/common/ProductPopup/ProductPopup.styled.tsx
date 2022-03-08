import { Button } from "@components/ui";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import customScroll from "@styles/customScroll.styled";
import tw from "twin.macro";

interface ProductVariantColorProps {
    isSelected?: boolean;
    isPride?: boolean;
}

const riseAnimation = keyframes`
    0% {
        transform: translateY(100%);
        opacity: 0;
    } 100% {
        transform: translateY(0%);
        opacity: 1;
    }
`;

export const Root = styled.aside`
    ${tw`relative block`}
`;

export const Overlay = styled.div`
    ${tw`fixed inset-0 z-index[95] bg-accents-9 opacity-40 pointer-events-auto`}

    cursor: url(/close-cursor-image.svg), pointer;
`;

export const Container = styled.section`
    ${tw`fixed z-index[95] bottom-9 right[4vw] width[94vw] height[80%] bg-primary
    rounded-md overflow-y-scroll
    md:(width[55vw] right[0] left[0] mx-auto)
    lg:(bottom-4 height[85%] width[33vw] ml-auto mr-10)
    2xl:(width[32rem])`}

    animation : ${riseAnimation} 0.5s ease-out 1 forwards;

    filter: drop-shadow(rgba(0, 0, 0, 0.15) 1px 1px 3px);
    /* border-top-left-radius: 1.5rem; */

    clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 5%);

    ${customScroll}
`;

export const CloseWrapper = styled.div`
    ${tw`absolute top-3 right-3 w-4 cursor-pointer z-10
    xl:(py-11 top-0 right-8)`}

    &:hover svg {
        transition: fill 0.3s;
        fill: #e00b25;
        cursor: pointer;
    }
`;

export const Content = styled.div`
    ${tw`relative flex flex-col py-8 px-4
    lg:pt-10
    2xl:px-6`}
`;

export const ProductInfo = styled.div`
    ${tw`flex justify-between items-center mb-12 font-size[17px] tracking-tighter cursor-pointer
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
    ${tw`grid grid-cols-3 justify-between items-center gap-1.5 mb-6`}
`;
export const ProductVariantColor = styled.article<ProductVariantColorProps>`
    ${tw`flex flex-col items-center justify-start text-center flex-1 
    border border-color[#f0f0f0] border-radius[3px] bg-primary cursor-pointer
    md:min-height[12.5rem]
    lg:min-height[14.5vw]
    2xl:min-height[13.5rem]`};
    min-height: 38vw;
    transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
    // width: calc(33.333333333%);

    h2 {
        ${tw`mx-2 font-size[13px] text-accents-8
        xl:font-size[14px]
        2xl:font-size[16px]`}
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

export const VariantSizeGender = styled(ProductVariantColor)`
    ${tw`relative justify-center min-height[15vw]
    md:min-height[5.5rem]`}
`;

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

    &:hover {
        ${tw`bg-accents-9 text-secondary shadow-md`}
    }

    &:active {
        ${tw`bg-accents-9`}
    }
`;
