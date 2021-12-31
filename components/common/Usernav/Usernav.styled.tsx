import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw, { theme } from "twin.macro";

interface NavBtnProps {
    isSelected: boolean;
}

export const Root = styled.main`
    ${tw`fixed inset-0 z-40 h-full overflow-hidden overflow-y-auto`}

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
    ${tw`flex flex-1 flex-col lg:flex-row overflow-hidden`}
`;

export const Navigation = styled.section<Record<string, unknown>>`
    ${tw`text-2xl text-primary bg-primary pt-20 
      lg:(width[34%] pt-28 bg-accents-3)`}

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

export const NavBtn = styled.button<NavBtnProps>`
    ${tw`relative flex items-center
    lg:(py-3.5 border-b-2 border-secondary border-solid)`}

    @media only screen and (min-width: ${theme`screens.lg`}) {
        &:first-of-type {
            ${tw`border-t-2 border-black border-solid`}
        }
    }

    &:not(:last-child) {
        padding-right: 10vw;

        ${tw`lg:px-0`}
    }

    svg {
        ${tw`absolute top-1/2 opacity-0`}
        transition : cubic-bezier(.19,1,.22,1) .3s;
        transform: translateY(-50%);

        ${(props) =>
            props.isSelected
                ? css`
                      ${tw`opacity-100 left-0`}
                  `
                : css`
                      ${tw`left-1/4 text-accents-5 
                      lg:(left-8 text-primary)`}
                  `};
    }
    h1 {
        ${tw`transition-transform font-normal text-accents-5 tracking-tighter
         lg:(font-size[1.35rem] text-primary)`}

        ${(props) =>
            props.isSelected
                ? css`
                      transform: translateX(2rem);
                      color: var(--text-base);
                  `
                : css`
                      transform: translateX(0);
                  `}
    }

    &:hover svg {
        opacity: 1;
        left: 0;
    }

    &:hover h1 {
        transform: translateX(2rem);
    }
`;

export const Separator = styled.hr`
    ${tw`mt-6 bg-secondary`}
    height : 3px;
`;

export const Content = styled.section<Record<string, unknown>>`
    ${tw`max-w-full min-h-screen bg-primary outline-none 
      lg:(width[66%] pt-28)`}

    padding-left: 4vw;
    padding-right: 4vw;

    @media only screen and (min-width: ${theme`screens.lg`}) {
        padding-left: 2.66666666667vw;
        padding-right: 2.66666666667vw;
    }
`;
