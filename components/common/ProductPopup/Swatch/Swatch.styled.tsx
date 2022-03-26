import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface ProductVariantProps {
    isSelected?: boolean;
    isPride?: boolean;
    isAvailable: boolean;
    isOutOfStock: boolean;
    hasImage?: boolean;
}

const rainbow = css`
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
`;

export const ProductVariantColor = styled.label<ProductVariantProps>`
    ${tw`relative flex flex-col items-center justify-start h-full
    border border-color[#f0f0f0] border-radius[3px] 
    bg-primary cursor-pointer text-center`};

    ${({ hasImage }) =>
        hasImage &&
        css`
            ${tw`padding[2vw]
            sm:padding[3vw]
            md:padding[2vw]
            lg:padding[5px]`}
        `}

    // font
    ${tw`font-size[13px]
        md:font-size[14px]
        2xl:font-size[16px]`}

    transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);

    input {
        ${tw`absolute z-30 top-0 left-0 w-full h-full opacity-0 cursor-pointer`}

        &:checked + span {
            ${({ isPride, isAvailable }) =>
                isAvailable &&
                css`
                    ${isPride
                        ? css`
                              ${rainbow}
                          `
                        : css`
                              background-color: #f0f0f0;
                          `}
                    box-shadow: inset 0 0 0 2px #676767be;
                    cursor: auto;
                `}
        }
    }

    & > span:first-of-type {
        ${tw`absolute z-10 top-0 left-0 
         w-full h-full opacity-100 cursor-pointer`}
    }
    & > span:nth-of-type(2),
    & > span:last-of-type {
        ${tw`relative z-20 mx-3.5`}
    }

    ${({ isAvailable }) =>
        !isAvailable &&
        css`
            pointer-events: none;
            background: #f0f0f0;
            border: 1px solid #e4e4e4;
            box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
            color: #676767;
            display: flex;
            flex-direction: column;
        `}
    ${({ isOutOfStock }) =>
        isOutOfStock &&
        css`
            pointer-events: none;
            background: #f0f0f0;
            border: 1px solid #e4e4e4;
            box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
            color: red;
            display: flex;
            flex-direction: column;
        `}

    @media (hover:hover) and (pointer: fine) {
        &:hover {
            background-color: #f0f0f0;
        }
    }

    &:active {
        box-shadow: inset 0 0 0 2.5px #676767be;
    }
`;

export const VariantSizeGender = styled(ProductVariantColor)`
    ${tw`relative justify-center height[16vw]
    md:height[10vw]`}
`;

export const ImageVariantWrapper = styled.span`
    ${tw`relative w-full`}
`;
