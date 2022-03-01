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
            ${tw`relative w-full h-full`}
        }
    }
`;
