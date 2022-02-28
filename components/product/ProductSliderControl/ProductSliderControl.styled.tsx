import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface ControlBtnProps {
    direction: "left" | "right";
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

    ${tw`absolute top-1/2 z-30 px-6 cursor-pointer
    xs:(px-7)`}
    ${tw`sm:(px-9)`}
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

    &:hover {
        ${tw`bg-accents-3`}
    }

    &:focus {
        outline: none;
    }
`;
