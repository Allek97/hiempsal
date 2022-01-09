import { EffectButton } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw, { theme } from "twin.macro";

interface NavBtnProps {
    isSelected: boolean;
}

export const Root = styled.main`
    ${tw`fixed inset-0 z-40 h-full overflow-hidden overflow-y-auto bg-accents-3`}

    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 8rem;
    }

    &::-webkit-scrollbar-track {
        background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
        background-color: RGBA(var(--color-blue-special));
        box-shadow: inset 0 0 6px RGBA(0, 0, 0, 0.5);
        border-radius: 8rem;
    }

    &::-webkit-scrollbar-thumb:window-inactive {
        background-color: RGBA(var(--color-blue-special));
    }
`;

export const Container = styled.div`
    ${tw`flex flex-1 flex-col max-w-8xl mx-auto lg:flex-row overflow-hidden`}
`;

export const Navigation = styled.section<Record<string, unknown>>`
    ${tw`text-2xl text-primary bg-primary pt-20 
      lg:(width[34%] pt-40 bg-accents-3)`}

    padding-left: 4vw;
    padding-right: 4vw;

    nav {
        ${tw`flex lg:flex-col`}
    }

    @media only screen and (min-width: ${theme`screens.lg`}) {
        padding-left: 2.66666666667vw;
        padding-right: 2.66666666667vw;
    }
`;

export const NavBtn = styled(EffectButton)<NavBtnProps>`
    ${tw`lg:(py-3 border-b-2 border-secondary border-solid font-size[1.25rem] text-primary)
    xl:(font-size[1.6vw] py-4)
    2xl:(font-size[1.27vw])`}

    @media only screen and (min-width: ${theme`screens.lg`}) {
        &:first-of-type {
            ${tw`border-t-2 border-black border-solid`}
        }
    }

    &:not(:last-child) {
        padding-right: 10vw;

        ${tw`lg:px-0`}
    }

    h1 {
        ${tw`text-accents-5 lg:text-primary`}

        ${(props) =>
            props.isSelected &&
            css`
                ${tw`text-primary`}
            `};
    }

    svg {
        ${(props) =>
            props.isSelected
                ? css`
                      ${tw`text-primary`}
                  `
                : css`
                      ${tw`text-accents-5 lg:text-primary`}
                  `};
    }
`;

export const HelpCard = styled.div`
    ${tw`fixed bottom-16 flex items-center transition 
    font-size[14.5px] cursor-pointer`}

    div:nth-of-type(2) {
        ${tw`flex flex-col leading-6`}

        span {
            ${tw`w-max`}
        }

        span:nth-of-type(2) {
            ${tw`text-accents-6 text-xs`}
        }
    }

    &:hover div:nth-of-type(2) {
        span:first-of-type {
            ${tw`transition`}
            transform: skewX(-10deg);
        }
    }
`;

export const HelpCardImage = styled.div`
    ${tw`h-11 w-11`}

    margin-right: 0.8vw;
    border-radius: 50%;
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.15));
    overflow: hidden;
`;

export const Content = styled.section<Record<string, unknown>>`
    ${tw`max-w-full min-h-screen bg-primary outline-none 
      lg:(width[66%] pt-40)`}

    padding-left: 4vw;
    padding-right: 4vw;

    @media only screen and (min-width: ${theme`screens.lg`}) {
        padding-left: 2.66666666667vw;
        padding-right: 2.66666666667vw;
    }
`;
