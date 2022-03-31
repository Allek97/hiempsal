import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

interface BtnProps {
    isMobileMenuOpen: boolean;
    isUsernavOpen: boolean;
    isProfileOpen: boolean;
    isProductPopupOpen?: boolean;
}

export const MobileNavRoot = styled(motion.nav)`
    ${tw`fixed bottom-4 left-1/2 z-index[200] w-12 h-12`}
`;

export const MenuBtn = styled(motion.button)<BtnProps>`
    ${tw`absolute z-10 flex items-center justify-center w-full h-full 
        border-radius[50%] bg-primary hover:text-accents-6`};

    box-shadow: var(--shadow-2);

    svg {
        ${(props) =>
            props.isMobileMenuOpen || props.isProductPopupOpen
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
            props.isProductPopupOpen &&
            css`
                fill: black;
            `}
    }
`;

export const Navigation = styled.nav`
    ${tw`absolute top-0 flex items-center h-full w-full bg-primary`}

    box-shadow: var(--shadow-0);
    border-radius: 50%;
`;

export const Cart = styled(motion.div)<BtnProps>`
    ${tw`absolute left[38%] w-20 h-10 flex items-center rounded-3xl bg-primary`}

    // BUG: translate-x not working in tailwind
    /* transform: translateX(-100%); */

    box-shadow: var(--shadow-1);

    button {
        ${tw`transition-colors ml-auto mr-5`}

        ${(props) =>
            (props.isMobileMenuOpen || props.isProfileOpen) &&
            css`
                ${tw`text-accents-6`}
            `}

        @media (hover: hover) and (pointer: fine) {
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
    }
`;

export const Profile = styled(motion.div)<BtnProps>`
    ${tw`absolute left[-90%] w-20 h-10 flex items-center rounded-3xl bg-primary`}

    box-shadow: var(--shadow-1);

    button {
        ${tw`transition-colors mr-auto ml-3.5`}

        ${(props) =>
            (props.isMobileMenuOpen || props.isUsernavOpen) &&
            css`
                ${tw`text-accents-6`}
            `}

        @media (hover: hover) and (pointer: fine) {
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

        svg {
            ${tw`h-6 w-6`}
        }
    }
`;
