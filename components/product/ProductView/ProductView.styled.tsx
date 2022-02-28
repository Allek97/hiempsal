import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.div`
    ${tw`relative max-w-7xl w-full min-height[auto]`}
`;

export const SliderContainer = styled.div`
    ${tw`flex items-center justify-center height[95vw] overflow-x-hidden bg-accents-1`}
    max-height: 650px;
`;

export const ImageContainer = styled.div`
    ${tw`relative w-full h-full text-center`}

    & > div:last-of-type {
        &,
        div {
            ${tw`w-full h-full`}
        }
    }
`;

export const ImageControlView = styled.div`
    ${tw``}
`;
export const ImageControlZoom = styled.div`
    ${tw`absolute top-10 right-10 flex flex-col z-30 shadow-xl
     bg-transparent text-accents-0 select-none`}

    button {
        ${tw`px-5 py-2 border-accents-8 border  bg-accents-5 cursor-pointer`}
        transition: background-color 0.2s ease;

        &:first-of-type {
            ${tw`mb-2`}
        }

        &:hover {
            ${tw`bg-accents-6`}
        }

        &:focus {
            outline: none;
        }
    }
`;
