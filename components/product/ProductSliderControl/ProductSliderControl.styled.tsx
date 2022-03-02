import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

import Ripples from "react-ripples";

interface RippleProps {
    direction: "left" | "right";
    isRippleActive: boolean;
}

interface ControlBtnProps {
    isExtremity: boolean;
}

export const Ripple = styled(Ripples)<RippleProps>`
    position: absolute !important;

    ${tw`top-1/2 z-30`}

    transform: translateY(-50%);

    ${(props) =>
        props.direction === "right"
            ? css`
                  ${tw`right-10`}
              `
            : css`
                  ${tw`left-10`}
              `}

    // Deactivate the ripple effct
    ${(props) =>
        !props.isRippleActive &&
        css`
            & > s {
                height: 0 !important;
                width: 0 !important;
            }
        `}
`;

const control = css`
    ${tw`shadow-xl border-accents-8 border bg-primary text-accents-9 select-none
    height[38px]
    xs:(height[40px])`}

    ${tw`sm:(height[48px])`}
`;

export const ControlBtn = styled.button<ControlBtnProps>`
    ${control}

    ${tw`px-3 text-lg cursor-pointer
    xs:(px-4)`}
    ${tw`sm:(px-4 font-size[24px])`}

    transition: background-color 0.2s ease;

    ${(props) =>
        props.isExtremity
            ? css`
                  ${tw`bg-gray-200 text-gray-400`}
              `
            : css`
                  @media (hover: hover) and (pointer: fine) {
                      &:hover {
                          ${tw`bg-accents-3`}
                      }
                  }
              `}

    &:focus {
        outline: none;
    }
`;
