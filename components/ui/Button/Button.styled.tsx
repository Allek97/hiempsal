import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    isHoverActive: boolean;
}

export const Root = styled.button<Props>`
    ${tw`flex items-center justify-center w-full 
    shadow-lg rounded-sm bg-secondary line-height[1em] 
    text-accents-1 text-center cursor-pointer`}

    box-shadow : rgb(0 0 0 / 28%) 0.785217px 0.785217px 3.14087px;

    transition: background 0.5s cubic-bezier(0.19, 1, 0.22, 1),
        color 0.5s cubic-bezier(0.19, 1, 0.22, 1);

    ${({ isHoverActive }) =>
        isHoverActive &&
        css`
            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    ${tw`text-primary`}
                    background-color: white;
                }
            }

            @media (hover: hover) and (pointer: fine) {
                &:active {
                    ${tw`bg-accents-2 text-primary`}
                }
            }

            &:focus {
                ${tw`outline-none`}
            }
        `}
`;
