import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { transientOptions } from "@lib/transientOptions";
import { motion } from "framer-motion";
import tw from "twin.macro";

interface RootProps {
    isScrolled: boolean;
    isMobileMenuOpen: boolean;
    isPopupOpen: boolean;
    isUsernavOpen: boolean;
    isHidden: boolean;
}

interface ContainerProps {
    isScrolled?: boolean;
    isMobileMenuOpen?: boolean;
    isAuthentificationOpen: boolean;
}
interface WrapperProps {
    isHistoric: boolean;
}

interface NavbarItemProps {
    isUsernavOpen: boolean;
    isUsernavScrolled: boolean;
}
interface HiemsalProps {
    isUsernavOpen: boolean;
    isAuthentificationOpen: boolean;
    isScrolled: boolean;
}

const fadeIn = keyframes`
    to {
        opacity: 1;
    }
`;

export const NavbarRoot = styled.div<RootProps>`
    ${tw`sticky top-0 z-50 bg-transparent`}

    transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);

    ${({ isHidden }) =>
        isHidden &&
        css`
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            transform: translateY(-100%);
        `}

    &:before {
        content: "";

        ${tw`absolute left-0 right-0 h-full bg-white`}

        transition: transform .5s cubic-bezier(0.19, 1, 0.22, 1);
        transform-origin: top;

        transform: scaleY(0);
        box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;

        ${(props) =>
            props.isScrolled || props.isMobileMenuOpen
                ? css`
                      transform: scaleY(1);
                  `
                : css`
                      transform: scaleY(0);
                  `}

        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
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
            props.isScrolled || props.isMobileMenuOpen
                ? css`
                      transform: scaleX(1);
                  `
                : css`
                      transform: scaleX(0);
                      transform-origin: right;
                  `}

        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }
`;

export const Container = styled.div<ContainerProps>`
    ${tw`padding-top[1.1rem] padding-bottom[1.1rem] mx-auto `}

    ${({ isAuthentificationOpen }) =>
        isAuthentificationOpen
            ? css`
                  position: absolute;
                  width: 100%;
              `
            : css`
                  position: relative;
              `}

    ${({ theme }) => theme.layout.mainPadding}

    transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);

    &:before {
        content: "";

        ${tw`absolute top-0 height[3px]`}

        ${({ theme }) => theme.layout.mainAbsoluteSides}

        box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;
        background-color: #e00b25;

        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);

        transform-origin: left;

        ${(props) =>
            !props.isScrolled
                ? css`
                      transform: scaleX(1);
                  `
                : css`
                      transform: scaleX(0);
                      transform-origin: right;
                  `}
    }
`;

export const textSizeNav = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter 
    lg:font-size[17px]`}

    ${tw`2xl:font-size[18px]`}
`;

export const Navigation = styled.nav`
    ${tw`flex items-center`}

    nav {
        ${textSizeNav}
    }
`;

export const WrapperBtn = styled.button<WrapperProps>`
    ${tw`self-center margin-right[0.7vw] transition-all cursor-pointer`}

    svg {
        ${tw`mx-auto h-full text-primary`}

        ${({ isHistoric }) =>
            isHistoric
                ? css`
                      ${tw`max-width[20px] width[5.6vw] 
                           md:width[2.4vw]
                           lg:width[1.2vw]`}
                  `
                : css`
                      ${tw`width[28px] 2xl:width[34px]`}
                  `}
    }

    opacity: 0;
    animation: ${fadeIn} 0.75s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.3s 1
        forwards;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${(props) =>
                props.isHistoric
                    ? css`
                          transform: translateX(-5px);
                      `
                    : css`
                          transform: scale(1.05);
                      `};
        }
    }
`;

export const NavbarItem = styled.button<NavbarItemProps>`
    ${tw`margin-left[0.7vw] margin-right[0.7vw] transition-colors text-accents-7 cursor-pointer`}

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
`;

export const Profile = styled.div`
    ${tw`inline-block height[28px] width[28px] rounded-full border-2 border-primary 
    hover:border-secondary 
    focus:border-secondary transition-colors ease-linear`}

    background-image: linear-gradient(140deg, rgb(121, 40, 202), rgb(121, 255, 225) 100%);
`;

export const BackBtn = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 10.4vw;
    height: 10.4vw;
    max-width: 40px;
    max-height: 40px;
    margin-right: 2vw;
    background-color: #ffffff;
    color: #191919;
    border-radius: 50%;
    border: 1px solid #f0f0f0;
    box-sizing: border-box;
    box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
    color: #191919;
`;
interface UtilityProps {
    $isWishlist?: boolean;
}

export const UtilityButton = styled(
    motion.button,
    transientOptions
)<UtilityProps>`
    ${tw`relative`}

    span {
        ${tw`absolute  
        flex items-center justify-center h-3.5 w-3.5 
        font-size[9px] text-secondary`}

        ${({ $isWishlist }) =>
            $isWishlist
                ? css`
                      ${tw`top-1/2 left-1/2`}
                      transform: translate(-50%,-50%)
                  `
                : css`
                      ${tw`-top-1.5 -right-1.5 bg-orange-red border-radius[50%]`}
                  `}
    }

    svg {
        ${tw`h-auto transition-colors cursor-pointer hover:text-orange-red`}
    }

    &:nth-of-type(3) {
        svg {
            width: 25px;
        }
    }
`;

export const UtilityAnimation = styled.div`
    ${tw`absolute top-0 left-0 w-full h-full
        overflow-hidden pointer-events-none`}

    div {
        ${tw`absolute top-0 right-0 mx-auto`}
    }
`;
