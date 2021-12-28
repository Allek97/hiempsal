import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface NavBtnProps {
    isSelected: boolean;
}

export const Root = styled.main`
    ${tw`fixed inset-0 z-40 h-full overflow-hidden overflow-y-auto`}
`;

export const Container = styled.div`
    ${tw`flex flex-1 flex-col overflow-hidden`}
`;

export const Navigation = styled.section`
    ${tw`text-2xl text-primary`}

    padding : 5rem 4vw 0;
    background: var(--primary);

    nav {
        ${tw`flex`}
    }
`;

export const NavBtn = styled.button<NavBtnProps>`
    ${tw`relative flex items-center`}

    &:not(:last-child) {
        padding-right: 10vw;
    }

    svg {
        ${tw`absolute top-1.5 opacity-0`}
        transition : cubic-bezier(.19,1,.22,1) .3s;

        ${(props) =>
            props.isSelected
                ? css`
                      ${tw`opacity-100 left-0`}
                  `
                : css`
                      ${tw`left-1/4 text-accents-5`}
                  `}
    }
    h1 {
        ${tw`transition-transform font-normal text-accents-5 tracking-tighter`}

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

export const Content = styled.section`
    ${tw`max-w-full min-h-screen outline-none`}

    padding : 0 4vw;

    background: var(--primary);
`;
