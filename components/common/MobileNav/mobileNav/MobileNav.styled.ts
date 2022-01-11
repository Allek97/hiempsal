import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface BtnProps {
    isMobileMenuOpen: boolean;
    isUsernavOpen: boolean;
    isProfileOpen: boolean;
}

////////////////////////////////////////////
// NOTE: Animations
///////////////////////////////////////////
const expandHorizontal = keyframes` 
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

const expandVertical = keyframes` 
    100% {
        opacity : 1;
        transform: translateY(0);
    }
`;

const smallRotate = keyframes` 
    0% { transform: rotate(70deg) }
    100% {transform: rotate(0)}
`;

////////////////////////////////////////////
///////////////////////////////////////////

export const MobileNavRoot = styled.nav`
    ${tw`fixed bottom-4 left-1/2 z-50 w-12 h-12`}
    opacity: 0;
    transform: translateY(100%);

    animation: ${expandVertical} 0.5s cubic-bezier(0.19, 1, 0.22, 1) 1s forwards;
`;

export const MenuBtn = styled.button<BtnProps>`
    ${tw`absolute z-10 flex items-center justify-center w-full h-full 
        border-radius[50%] bg-primary hover:text-accents-6`};

    box-shadow: var(--shadow-2);

    svg {
        ${(props) =>
            props.isMobileMenuOpen
                ? css`
                      ${tw`h-5 w-5`}
                  `
                : css`
                      ${tw`h-6 w-6`}
                  `}

        ${(props) =>
            (props.isUsernavOpen || props.isProfileOpen) &&
            !props.isMobileMenuOpen &&
            css`
                ${tw`text-accents-6`}
            `}

            ${(props) =>
            props.isMobileMenuOpen &&
            css`
                animation: ${smallRotate} 1s cubic-bezier(0.19, 1, 0.22, 1) 1
                    forwards;
            `}
    }
`;

export const Navigation = styled.nav`
    ${tw`absolute top-0 flex items-center h-full w-full bg-primary`}

    box-shadow: var(--shadow-0);
    border-radius: 50%;
`;

export const Cart = styled.div<BtnProps>`
    ${tw`absolute left-1/2 w-20 h-10 flex items-center rounded-3xl opacity-0 bg-primary`}

    // BUG: translate-x not working in tailwind
    /* transform: translateX(100%); */
    box-shadow: var(--shadow-1);

    transform: translateX(-50%);
    animation: ${expandHorizontal} 0.7s cubic-bezier(0.19, 1, 0.22, 1) 1.2s
        forwards;

    button {
        ${tw`transition-colors ml-auto mr-5`}

        ${(props) =>
            (props.isMobileMenuOpen || props.isProfileOpen) &&
            css`
                ${tw`text-accents-6`}
            `}

        &:hover {
            ${(props) =>
                !props.isMobileMenuOpen &&
                !props.isUsernavOpen &&
                !props.isProfileOpen &&
                css`
                    ${tw`text-accents-6`}
                `}
        }
    }
`;

export const Profile = styled.div<BtnProps>`
    ${tw`absolute -left-full w-20 h-10 flex items-center rounded-3xl opacity-0 bg-primary`}

    // BUG: translate-x not working in tailwind
    /* transform: translateX(-100%); */
    
    transform: translateX(50%);
    animation: ${expandHorizontal} 0.7s cubic-bezier(0.19, 1, 0.22, 1) 1.2s
        forwards;

    box-shadow: var(--shadow-1);

    button {
        ${tw`transition-colors mr-auto ml-3.5`}

        ${(props) =>
            (props.isMobileMenuOpen || props.isUsernavOpen) &&
            css`
                ${tw`text-accents-6`}
            `}

        &:hover {
            ${(props) =>
                !props.isMobileMenuOpen &&
                !props.isUsernavOpen &&
                !props.isProfileOpen &&
                css`
                    ${tw`text-accents-6`}
                `}
        }

        svg {
            ${tw`h-6 w-6`}
        }
    }
`;
