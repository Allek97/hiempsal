import styled from "@emotion/styled";
import tw from "twin.macro";

interface ImageControlProps {
    isMoved: boolean;
}

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
            ${tw`relative w-full h-full`}
        }
    }
`;

export const ImageControlView = styled.div`
    ${tw`user-select[contain]`}

    & > button:first-of-type,& > button:nth-of-type(2) {
        ${tw`transition-transform`}
        ${tw`absolute z-30 p-2 shadow-xl border-accents-8 border   
        bg-primary text-primary text-xl select-none`}
    }

    & > button:first-of-type {
        ${tw`top-10 left-10`}

        &:hover {
            ${tw`transition-transform`}
            transform: scale(1.1);
        }
    }

    & > button:nth-of-type(2) {
        ${tw`bottom-10 left-10`}
    }
`;

export const ImageControlZoom = styled.div`
    ${tw`absolute top-10 right-10 flex flex-col z-30 shadow-xl
      bg-transparent text-accents-9 font-size[17px] select-none`}

    button {
        ${tw`px-4 py-1.5 border-accents-8 border bg-primary cursor-pointer`}
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
