import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface ControlProps {
    direction: "left" | "right";
}

interface ControlBtnProps {
    isExtremity: boolean;
}

export const Control = styled.div<ControlProps>`
    position: absolute !important;

    ${tw`top-1/2 z-30`}

    transform: translateY(-50%);

    box-shadow: var(--shadow-2);

    ${(props) =>
        props.direction === "right"
            ? css`
                  ${tw`right-5 lg:right-10`}
              `
            : css`
                  ${tw`left-5 lg:left-10`}
              `}
`;

const common = css`
    ${tw`border-radius[5px] bg-primary text-accents-9 select-none
    height[38px]`}

    ${tw`sm:height[40px] md:font-size[20px] lg:(height[48px] text-2xl)`}
`;

export const ControlBtn = styled.button<ControlBtnProps>`
    ${common}

    ${tw`px-3 text-lg cursor-pointer sm:(px-4)`}
 

    transition: background-color 0.2s ease;

    ${(props) =>
        props.isExtremity
            ? css`
                  ${tw`bg-gray-200 text-gray-400`}
              `
            : css`
                  @media (hover: hover) and (pointer: fine) {
                      &:hover {
                          ${tw`bg-accents-5`}
                      }
                  }
              `}

    &:focus {
        outline: none;
    }
`;
