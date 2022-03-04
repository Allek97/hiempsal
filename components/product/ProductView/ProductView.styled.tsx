import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.div`
    ${tw`relative w-full min-height[auto]
    lg:pr-11`}
`;

export const SliderContainer = styled.div`
    ${tw`flex items-center justify-center max-w-7xl  height[82vh] overflow-x-hidden bg-accents-1`}
    max-height: 775px;
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
