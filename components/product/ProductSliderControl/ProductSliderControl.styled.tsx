import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface ControlBtnProps {
    direction: "left" | "right";
    isExtremity: boolean;
}

export const Control = styled.div`
    ${tw`shadow-xl border-accents-8 border bg-primary text-accents-9 select-none
    height[38px]
    xs:(height[40px])`}

    ${tw`sm:(height[48px])`}

    transform: translateY(-50%);
`;

export const ControlBtn = styled.button<ControlBtnProps>`
    ${tw`shadow-xl border-accents-8 border bg-primary text-accents-9 select-none
    height[38px]
    xs:(height[40px])`}

    ${tw`sm:(height[48px])`}

    transform: translateY(-50%);

    ${tw`absolute top-1/2 z-30 px-3 text-lg cursor-pointer
    xs:(px-4)`}
    ${tw`sm:(px-4 font-size[24px])`}
    transition: background-color 0.2s ease;

    ${(props) =>
        props.direction === "right"
            ? css`
                  ${tw`right-10 border-l border-accents-8`}
              `
            : css`
                  ${tw`left-10`}
                  margin-right: -1px;
              `}

    ${(props) =>
        props.isExtremity &&
        css`
            ${tw`bg-orange-red`}
        `}

    &:hover {
        ${tw`bg-accents-3`}
    }

    &:focus {
        outline: none;
    }
`;
