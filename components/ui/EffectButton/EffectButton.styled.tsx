import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    isSelected: boolean;
}

export const EffectBtnRoot = styled.button<Props>`
    ${tw`relative inline-flex items-center w-full`}

    svg {
        ${tw`opacity-0`}

        transform: translateX(-0.75em);
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
            opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }
    h1 {
        ${tw`font-normal tracking-tighter margin-left[-1.06em]`}
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
            opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }

    ${({ isSelected }) =>
        isSelected
            ? css`
                  svg {
                      ${tw`opacity-100`}
                      transform: translateX(0);
                  }
                  h1 {
                      transform: translateX(1.4em);
                  }
              `
            : css`
                  h1 {
                      transform: translateX(0);
                  }
              `}

    @media (hover: hover) and (pointer: fine) {
        &:hover svg {
            opacity: 1;
            transform: none;
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1) 0.1s,
                opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1) 0.1s;
        }

        &:hover h1 {
            transform: translateX(1.4em);
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
    }
`;
