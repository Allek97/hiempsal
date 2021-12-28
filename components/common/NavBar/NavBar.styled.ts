import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    isUsernavOpen: boolean;
}
interface HiemsalProps {
    isDesktop: boolean;
    isUsernavOpen: boolean;
}

const fadeIn = keyframes`
    to {
        opacity: 1;
    }
`;

export const NavbarRoot = styled.div<Props>`
    ${tw`sticky top-0 z-50`}

    background-color: ${(props) =>
        props.isUsernavOpen ? "transparent" : "#fff"};
`;

export const Navigation = styled.nav`
    ${tw`flex`}
`;

export const LogoWrapper = styled.div<Props>`
    ${tw`transition-transform h-9 w-9 cursor-pointer`}

    ${(props) =>
        props.isUsernavOpen &&
        css`
            transform: translateY(-0.5rem);
            opacity: 0;
            animation: ${fadeIn} 0.75s cubic-bezier(0.455, 0.03, 0.515, 0.955)
                0.3s 1 forwards;
        `};

    svg {
        ${tw`w-full h-full`}
    }

    &:hover {
        ${(props) =>
            props.isUsernavOpen
                ? css`
                      transform: scale(1.05) translateY(-0.5rem);
                  `
                : css`
                      transform: scale(1.05);
                  `};
    }
`;

export const NavbarItem = styled.span`
    ${tw`text-lg text-accents-6 cursor-pointer`}

    &:hover {
        ${tw`text-accents-9`}
        transform: skew(-10deg);
    }
`;

export const HiemsalWrapper = styled.div<HiemsalProps>`
    ${tw`transition-transform w-52 m-auto cursor-pointer`}

    ${(props) =>
        props.isUsernavOpen &&
        css`
            transform: translateY(-1rem);
            opacity: 0;
            animation: ${fadeIn} 0.75s cubic-bezier(0.455, 0.03, 0.515, 0.955)
                0.3s 1 forwards;
        `};

    svg {
        ${tw`w-3/4 h-3/4`}

        ${(props) =>
            props.isDesktop &&
            css`
                ${tw`w-full h-full`}
            `};
    }
`;

export const UtilWrapper = styled.div`
    ${tw`flex items-center space-x-6`}

    svg {
        ${tw`cursor-pointer transition-colors hover:text-accents-7`}
    }
`;

export const Profile = styled.div`
    ${tw`inline-block h-8 w-8 rounded-full border-2 border-primary 
    hover:border-secondary 
    focus:border-secondary transition-colors ease-linear`}

    background-image: linear-gradient(140deg, rgb(121, 40, 202), rgb(121, 255, 225) 100%);
`;
