import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import tw from "twin.macro";

interface ProductVariantColorProps {
    isSelected?: boolean;
    isPride?: boolean;
}

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
        ${tw`mx-2 font-size[13px] text-accents-8 capitalize
        xl:font-size[14px]
        2xl:font-size[16px]`}
    }

    ${(props) =>
        props.isSelected &&
        (props.isPride
            ? css`
                  background: linear-gradient(
                      120deg,
                      rgba(255, 0, 0, 0.75) 0%,
                      rgba(255, 154, 0, 0.75) 10%,
                      rgba(208, 222, 33, 0.75) 20%,
                      rgba(79, 220, 74, 0.75) 30%,
                      rgba(63, 218, 216, 0.75) 40%,
                      rgba(47, 201, 226, 0.75) 50%,
                      rgba(28, 127, 238, 0.75) 60%,
                      rgba(95, 21, 242, 0.75) 70%,
                      rgba(186, 12, 248, 0.75) 80%,
                      rgba(251, 7, 217, 0.75) 90%,
                      rgba(255, 0, 0, 0.75) 100%
                  );
                  box-shadow: inset 0 0 0 2px #676767be;
                  cursor: auto;
              `
            : css`
                  background-color: #f0f0f0;
                  box-shadow: inset 0 0 0 2px #676767be;
                  cursor: auto;
              `)}

    @media (hover:hover) and (pointer: fine) {
        &:hover {
            background-color: #f0f0f0;
        }
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

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${tw`bg-accents-9 text-secondary shadow-md`}
        }
    }

    &:active {
        ${tw`bg-accents-9`}
    }
`;
