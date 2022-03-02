import { css } from "@emotion/react";
import styled from "@emotion/styled";
import customScroll from "@styles/customScroll.styled";
import tw from "twin.macro";

interface SliderProps {
    isMounted: boolean;
}

interface ThumbProps {
    isSelected: boolean;
}

export const Root = styled.div`
    ${tw`relative flex flex-col h-full w-full select-none overflow-hidden`}
`;

export const Slider = styled.div<SliderProps>`
    ${tw`relative flex h-full transition-opacity duration-150`}

    ${(props) =>
        props.isMounted
            ? css`
                  ${tw`opacity-100`}
              `
            : css`
                  ${tw`opacity-0`}
              `}
`;

export const ImageControlView = styled.div`
    ${tw`user-select[contain]`}

    & > button:first-of-type,& > button:nth-of-type(2) {
        ${tw`transition-transform`}
        ${tw`absolute z-30 p-1.5 shadow-xl border-accents-8 border   
        bg-primary text-primary text-xl select-none
        sm:p-2.5
        md:text-2xl`}
    }

    & > button:first-of-type {
        ${tw`top-10 left-10`}

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                ${tw`transition-transform`}
                transform: scale(1.1);
            }
        }
    }

    & > button:nth-of-type(2) {
        ${tw`bottom-10 left-10`}
        @media (hover: hover) and (pointer: fine) {
            &:hover {
                ${tw`transition-transform`}
                transform: scale(1.1) rotate(-20deg);
            }
        }
    }
`;

export const ImageControlZoom = styled.div`
    ${tw`absolute top-10 right-10 flex flex-col z-30 shadow-xl
      bg-transparent text-accents-9 font-size[17px] select-none`}

    button {
        ${tw`p-2 text-lg border-accents-8 border bg-primary cursor-pointer
        sm:p-3
        md:text-xl`}
        transition: background-color 0.2s ease;

        &:first-of-type {
            ${tw`mb-2`}
        }

        &:hover {
            ${tw`bg-accents-3`}
        }

        &:focus {
            outline: none;
        }
    }
`;

export const Album = styled.div`
    ${tw`w-full height[230px] bg-accents-5 whitespace-nowrap overflow-x-hidden overflow-y-hidden`}
`;

export const Thumb = styled.button<ThumbProps>`
    ${tw`overflow-auto inline-block cursor-pointer h-full width[235px]`}

    ${(props) =>
        props.isSelected &&
        css`
            ${tw`bg-accents-9`}
        `}
`;
