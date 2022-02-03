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

        ${tw`absolute left[2.67vw] right[2.67vw] h-1
        lg:(left-11 right-11)`}
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
    ${tw`relative padding-left[2.67vw] padding-right[2.67vw] py-5 mx-auto max-w-8xl
    lg:px-11`}

    ${(props) =>
        props.isUsernavOpen &&
        css`
            padding: 1.25rem 2.66666666666667vw;
        `}


    &:before {
        content: "";

        ${tw`absolute top-0 left[2.67vw] right[2.67vw] height[3px]
        lg:(left-11 right-11)`}
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
    ${tw`flex`}
`;

export const Wrapper = styled.div<WrapperProps>`
    ${tw`transition-transform h-9 w-9 cursor-pointer`}

    svg {
        ${tw`w-full h-full`}
    }

    ${(props) =>
        props.isUsernavOpen &&
        css`
            opacity: 0;
            animation: ${fadeIn} 0.75s cubic-bezier(0.455, 0.03, 0.515, 0.955)
                0.3s 1 forwards;
        `};

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
`;

export const NavbarItem = styled.span<NavbarItemProps>`
    ${tw`transition-colors text-lg text-accents-6 cursor-pointer`}

    ${(props) =>
        props.isUsernavOpen &&
        !props.isUsernavScrolled &&
        css`
            ${tw`text-primary`}
        `}

    &:hover {
        ${tw`text-accents-9`}

        ${(props) =>
            props.isUsernavOpen &&
            !props.isUsernavScrolled &&
            css`
                ${tw`text-accents-7`}
            `}
    }
`;

export const HiemsalWrapper = styled.div<HiemsalProps>`
    ${tw`transition-transform w-52 m-auto cursor-pointer`}

    ${(props) =>
        props.isUsernavOpen &&
        css`
            transform: translateY(0);
            opacity: 0;
            animation: ${fadeIn} 0.75s cubic-bezier(0.455, 0.03, 0.515, 0.955)
                0.3s 1 forwards;
        `};

    svg {
        ${tw`w-3/4 h-3/4 lg:(w-full h-full)`}
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
