import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface SliderRef {
    isMounted: boolean;
}

export const Root = styled.div`
    ${tw`relative h-full w-full select-none overflow-hidden`}
`;

export const Slider = styled.div<SliderRef>`
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
