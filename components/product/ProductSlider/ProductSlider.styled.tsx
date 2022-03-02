import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

import Ripples from "react-ripples";

interface SliderProps {
    isMounted: boolean;
}

interface ThumbProps {
    isSelected: boolean;
}

interface RippleProps {
    isRippleActive: boolean;
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

export const Ripple = styled(Ripples)<RippleProps>`
    ${(props) =>
        !props.isRippleActive &&
        css`
            & > s {
                height: 0 !important;
                width: 0 !important;
            }
        `}
`;

export const ImageControlView = styled.div`
    ${tw`user-select[contain]`}

    & > div:nth-of-type(2),div:nth-of-type(3) {
        position: absolute !important;
        z-index: 30;

        button {
            ${tw`transition-transform`}
            ${tw`p-1.5 shadow-xl border-accents-8 border   
        bg-primary text-primary text-xl select-none
        sm:p-2.5
        md:text-2xl`}
        }
    }

    & > div:nth-of-type(2) {
        ${tw`top-10 left-10`}
        @media (hover: hover) and (pointer: fine) {
            &:hover {
                ${tw`transition-transform`}
                transform: scale(1.1);
            }
        }
    }

    div:nth-of-type(3) {
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
    ${tw`absolute top-10 right-10 z-30 flex flex-col shadow-xl
      bg-transparent text-accents-9 font-size[17px] select-none`}

    & > div:first-of-type {
        ${tw`mb-2`}
    }

    button {
        ${tw`p-2 text-lg border-accents-8 border bg-primary cursor-pointer
        sm:p-3
        md:text-xl`}
        transition: background-color 0.2s ease;

        &:hover {
            ${tw`bg-accents-3`}
        }

        &:focus {
            outline: none;
        }
    }
`;

export const Album = styled.div`
    ${tw`relative w-full height[230px] bg-accents-5 whitespace-nowrap 
    overflow-x-hidden overflow-y-hidden`}
`;

export const Thumb = styled.button<ThumbProps>`
    ${tw`h-full inline-block overflow-auto cursor-pointer`}

    ${(props) =>
        props.isSelected &&
        css`
            ${tw`bg-accents-9`}
        `}
`;
