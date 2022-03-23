import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    isSelected: boolean;
}

export const EffectBtnRoot = styled.button<Props>`
    ${tw`relative inline-flex items-center`}

    svg {
        ${tw`opacity-0`}

        transform: translateX(1.06em);
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
            opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);

        ${(props) =>
            props.isSelected &&
            css`
                ${tw`opacity-100`}
                transform: translateX(0);
            `};
    }
    h1 {
        ${tw`transition-transform font-normal tracking-tighter margin-left[-1.06em]`}

        ${(props) =>
            props.isSelected
                ? css`
                      transform: translateX(1.4em);
                  `
                : css`
                      transform: translateX(0);
                  `}
    }
    @media (hover: hover) and (pointer: fine) {
        &:hover svg {
            opacity: 1;
            transform: none;
        }

        &:hover h1 {
            transform: translateX(1.4em);
        }
    }
`;
