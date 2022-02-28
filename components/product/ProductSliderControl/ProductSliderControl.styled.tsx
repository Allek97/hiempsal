import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface ControlBtnProps {
    direction: "left" | "right";
}

export const Control = styled.div`
    ${tw`bg-accents-5 absolute bottom-10 right-10 flex flex-row
  border-accents-8 border text-accents-0 z-30 shadow-xl select-none
  height[48px]`}
`;

export const ControlBtn = styled.button<ControlBtnProps>`
    ${tw`px-9 cursor-pointer`}
    transition: background-color 0.2s ease;

    ${(props) =>
        props.direction === "right"
            ? css`
                  ${tw`border-l border-accents-8`}
              `
            : css`
                  margin-right: -1px;
              `}

    &:hover {
        ${tw`bg-accents-6`}
    }

    &:focus {
        outline: none;
    }
`;
