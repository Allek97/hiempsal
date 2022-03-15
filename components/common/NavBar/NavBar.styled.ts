import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface RootProps {
    isScrolled: boolean;
    isUsernavScrolled: boolean;
    isUsernavOpen: boolean;
    isMobileMenuOpen: boolean;
    isProductPopupOpen: boolean;
}
interface WrapperProps {
    isUsernavOpen: boolean;
    isScrolled?: boolean;
    isUsernavScrolled?: boolean;
    isMobileMenuOpen?: boolean;
}

interface NavbarItemProps {
    isUsernavOpen: boolean;
    isUsernavScrolled: boolean;
}
interface HiemsalProps {
    isUsernavOpen: boolean;
    isScrolled: boolean;
}

const fadeIn = keyframes`
    to {
        opacity: 1;
    }
`;

export const NavbarRoot = styled.div<RootProps>`
    ${tw`sticky top-0 z-50 bg-transparent`}

    ${(props) =>
        props.isProductPopupOpen &&
        !props.isMobileMenuOpen &&
        css`
            pointer-events: none;
        `}

    &:before {
        content: "";

        ${tw`absolute left-0 right-0 h-full bg-white`}

        transition: transform .5s cubic-bezier(0.19, 1, 0.22, 1);
        transform-origin: top;

        transform: scaleY(0);
        box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;

        ${(props) =>
            (props.isScrolled && !props.isUsernavOpen) ||
            (props.isUsernavScrolled && props.isUsernavOpen) ||
            props.isMobileMenuOpen
                ? css`
                      transform: scaleY(1);
                  `
                : css`
                      transform: scaleY(0);
                  `}
    }

    &:after {
        content: "";

        ${tw`absolute h-1`}

        ${({ theme }) => theme.layout.mainAbsoluteSides}

        box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;
        background-color: #e00b25;

        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);

        transform-origin: left;

        ${(props) =>
            (props.isScrolled && !props.isUsernavOpen) ||
            (props.isUsernavScrolled && props.isUsernavOpen) ||
            props.isMobileMenuOpen
                ? css`
                      transform: scaleX(1);
                  `
                : css`
                      transform: scaleX(0);
                      transform-origin: right;
                  `}
    }
`;

export const Container = styled.div<WrapperProps>`
    ${tw`relative padding-top[1.1rem] padding-bottom[1.1rem] mx-auto `}

    ${({ theme }) => theme.layout.mainPadding}


    &:before {
        content: "";

        ${tw`absolute top-0 height[3px]`}

        ${({ theme }) => theme.layout.mainAbsoluteSides}

        box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;
        background-color: #e00b25;

        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);

        transform-origin: left;

        ${(props) =>
            (!props.isScrolled && !props.isUsernavOpen) ||
            (!props.isUsernavScrolled &&
                props.isUsernavOpen &&
                !props.isMobileMenuOpen)
                ? css`
                      transform: scaleX(1);
                  `
                : css`
                      transform: scaleX(0);
                      transform-origin: right;
                  `}
    }
`;

export const Navigation = styled.nav`
    ${tw`flex items-center`}

    nav {
        ${({ theme }) => theme.textSize.textSizeMain}
    }
`;

export const Wrapper = styled.div<WrapperProps>`
    ${tw`transition-transform width[28px] cursor-pointer
    2xl:(width[34px])`}

    svg {
        ${tw`w-full h-full text-primary
        lg:(text-transparent)`}
    }

    ${(props) =>
        props.isUsernavOpen &&
        css`
            opacity: 0;
            animation: ${fadeIn} 0.75s cubic-bezier(0.455, 0.03, 0.515, 0.955)
                0.3s 1 forwards;
        `};

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${(props) =>
                props.isUsernavOpen
                    ? css`
                          transform: scale(0.95);
                      `
                    : css`
                          transform: scale(1.05);
                      `};
        }
    }
`;

export const NavbarItem = styled.button<NavbarItemProps>`
    ${tw`transition-colors text-accents-7 cursor-pointer`}

    transform-origin: center bottom;
    transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);

    ${(props) =>
        props.isUsernavOpen &&
        !props.isUsernavScrolled &&
        css`
            ${tw`text-primary`}
        `}
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${tw`text-accents-9`}
            transform: skew(-10deg);
            ${(props) =>
                props.isUsernavOpen &&
                !props.isUsernavScrolled &&
                css`
                    ${tw`text-accents-7`}
                `}
        }
    }
`;

export const HiemsalWrapper = styled.div<HiemsalProps>`
    ${tw`transition-transform w-full max-width[140px] m-auto cursor-pointer
    xl:max-width[180px]`}

    ${(props) =>
        props.isUsernavOpen &&
        css`
            transform: translateY(0);
            opacity: 0;
            animation: ${fadeIn} 0.75s cubic-bezier(0.455, 0.03, 0.515, 0.955)
                0.3s 1 forwards;
        `};

    svg {
        ${tw`w-full h-full`}
    }
`;

export const UtilWrapper = styled.div`
    ${tw`flex items-center space-x-6`}

    svg {
        ${tw`width[19px] transition-colors cursor-pointer hover:text-accents-7`}
    }

    & > button {
        &:first-of-type {
            svg {
                ${tw`width[21px]`}
            }
        }
    }
`;

export const Profile = styled.div`
    ${tw`inline-block height[28px] width[28px] rounded-full border-2 border-primary 
    hover:border-secondary 
    focus:border-secondary transition-colors ease-linear`}

    background-image: linear-gradient(140deg, rgb(121, 40, 202), rgb(121, 255, 225) 100%);
`;
