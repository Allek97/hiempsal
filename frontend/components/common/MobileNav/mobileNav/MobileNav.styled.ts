import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { transientOptions } from "@lib/transientOptions";

import { motion } from "framer-motion";
import tw from "twin.macro";

interface BtnProps {
    $isMobileMenuOpen: boolean;
    $isUsernavOpen: boolean;
    $isProfileOpen: boolean;
    $isPopupOpen?: boolean;
}

export const MobileNavRoot = styled(motion.div)`
    ${tw`fixed bottom-4 left-1/2 z-index[200] w-12 h-12`}
`;

export const MenuBtn = styled(motion.button, transientOptions)<BtnProps>`
    ${tw`absolute z-10 flex items-center justify-center w-full h-full 
        border-radius[50%] bg-primary`};

    box-shadow: var(--shadow-2);

    svg {
        ${(props) =>
            props.$isMobileMenuOpen || props.$isPopupOpen
                ? css`
                      ${tw`h-5 w-5`}
                  `
                : css`
                      ${tw`h-6 w-6`}
                  `}

        ${(props) =>
            props.$isPopupOpen &&
            css`
                fill: black;
            `}
        ${({ $isUsernavOpen, $isProfileOpen }) =>
            ($isProfileOpen || $isUsernavOpen) &&
            css`
                ${tw`text-accents-6`}
            `}
    }
`;

export const Navigation = styled.nav`
    ${tw`absolute top-0 flex items-center h-full w-full bg-primary`}

    box-shadow: var(--shadow-0);
    border-radius: 50%;
`;

export const Commun = styled(motion.div, transientOptions)<BtnProps>`
    ${tw`absolute w-20 h-10 flex items-center rounded-3xl
    overflow-hidden bg-primary`}

    // BUG: translate-x not working in tailwind
    /* transform: translateX(-100%); */

    box-shadow: var(--shadow-1);

    button {
        ${tw`relative transition-colors`}

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                ${(props) =>
                    !props.$isMobileMenuOpen &&
                    !props.$isUsernavOpen &&
                    !props.$isProfileOpen &&
                    css`
                        ${tw`text-accents-6`}
                    `}
            }
        }
    }

    span {
        ${tw`absolute -top-1.5 -right-1.5 bg-orange-red border-radius[50%] 
    flex items-center justify-center h-3.5 w-3.5 
    font-size[9px] text-secondary`}
    }
`;

export const Cart = styled(Commun, transientOptions)`
    ${tw`left[38%]`}

    // BUG: translate-x not working in tailwind
    /* transform: translateX(-100%); */

    box-shadow: var(--shadow-1);

    button {
        ${tw`ml-auto mr-5`}

        ${(props) =>
            !props.$isUsernavOpen &&
            css`
                ${tw`text-accents-6`}
            `}
    }

    svg:nth-of-type(2) {
        ${tw`absolute top-1/2 left-1/2 w-3`}
        fill: var(--orange-red);
        transform: translate(-50%, -40%);
    }
`;

export const Profile = styled(Commun, transientOptions)`
    ${tw`left[-92.5%]`}

    button {
        ${tw`mr-auto ml-3.5`}

        ${(props) =>
            !props.$isProfileOpen &&
            css`
                ${tw`text-accents-6`}
            `}
    }
`;

export const UtilityAnimation = styled.div`
    ${tw`absolute top-0 left-0 w-full h-full
        overflow-hidden pointer-events-none`}

    div {
        ${tw`absolute top-0 right-0 mx-auto`}
    }
`;
