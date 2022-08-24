import { Button } from "@components/ui";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { transientOptions } from "@lib/transientOptions";
import { motion } from "framer-motion";
import tw from "twin.macro";

const fadeIn = keyframes`
    100% {
        opacity: 1;
    }
`;

export const Main = styled.main`
    ${tw`min-h-screen bg-primary`}

    @media only screen and (min-width: 600px) {
        ${tw`flex items-center bg-black`}
    }
`;
export const Container = styled.div`
    ${tw`flex flex-col`}
    min-height: 540px;
    form {
        ${tw`padding[0 40px 20px]`}
    }

    @media only screen and (min-width: 500px) {
        max-width: 400px;
        margin: 0 auto;
    }

    @media only screen and (min-width: 600px) {
        border-radius: 5px;
        background-color: white;
    }
`;
export const Header = styled.main`
    ${tw`flex flex-col items-center padding[40px 40px 30px] text-center`}

    h1 {
        ${tw`mb-5 font-size[24px] leading-normal tracking-tight capitalize`}
    }
    span {
        ${tw`font-size[14px] tracking-tight`}
    }
`;

export const ImageContainer = styled.div`
    ${tw`relative height[52px] w-full mb-6`}
`;

interface FormLabelProps {
    $isError: boolean;
}

export const FormLabel = styled(motion.label, transientOptions)<FormLabelProps>`
    ${tw`relative flex justify-around items-center h-full
    border-radius[3px]`}
    border: 1.5px solid ${({ $isError }) =>
        $isError ? "var(--orange-red)" : "var(--accents-5)"};

    &:focus-within {
        outline: 2px solid
            ${({ $isError }) => ($isError ? "var(--orange-red)" : "#007bad")};
        border: 1.5px solid transparent;

        span {
            color: ${({ $isError }) =>
                $isError ? "var(--orange-red)" : "#007bad"};
        }
    }
`;

export const FormInput = styled(motion.input, transientOptions)`
    ${tw`padding[0 18px] w-full bg-white font-size[16px]`}

    &:focus + span,
    &:not(:placeholder-shown) + span {
        transform: translateY(-175%);
        padding-left: 6px;
        padding-right: 6px;
        left: 12px;
        transition: all 0.15s ease;
        background-color: white;
        font-size: 14px;
        ${tw`lg:(transform[translateY(-185%)] font-size[12px])`}
    }
    &:focus {
        outline: none;
    }
`;

export const InputPlaceholder = styled(motion.span)`
    ${tw`absolute left[18px] top[48%] w-max z-10
    text-accents-6 font-size[16px] cursor-text 
    tracking-normal leading-normal`}

    transform: translateY(-50%);
    transition: all 0.15s ease;

    user-select: none;
`;

interface PasswordBtnProps {
    isHidden: boolean;
}

export const PasswordBtn = styled.button<PasswordBtnProps>`
    ${tw`relative height[52px]`}
    svg {
        ${tw`h-auto w-6 mx-2.5`}
        fill: var(--accents-6);
    }

    @media (hover: hover) and (pointer: fine) {
        transition: background-color 0.3s ease;
        &:hover {
            transition: background-color 0.3s ease;
            ${tw`background-color[#e5e5e5b5]`}
        }
    }

    &:hover:before {
        ${({ isHidden }) =>
            isHidden
                ? css`
                      content: "Show password";
                  `
                : css`
                      content: "Hide password";
                  `};

        ${tw`absolute bottom-full left[-14px] h-11 width[70px] p-2
        border-radius[3px] bg-secondary font-size[12px] text-secondary leading-tight`};

        opacity: 0;
        animation: ${fadeIn} 0.5s ease forwards;
    }

    &:hover:after {
        ${tw`content absolute bottom[calc(100% - 8px)] left-1/2 
        w-0 transform[translateX(-50%)]`}

        opacity: 0;
        animation: ${fadeIn} 0.5s ease forwards;

        border-color: #000 transparent transparent;
        border-style: solid;
        border-width: 8px 8px 0;
    }
`;

export const PasswordWarn = styled.div`
    ${tw`flex flex-col padding[15px 16px] border-radius[3px] font-size[14px]`}
    border: 1.5px solid var(--accents-5);

    & > span {
        &:first-of-type {
            ${tw`mb-3`}
        }
    }
    div {
        ${tw`flex`}
        span {
            ${tw`flex ml-3`}
        }
    }
`;

export const ResetSubmitBtn = styled(Button)`
    ${tw`height[52px] bg-orange-red font-size[16px]`}

    @media (hover: hover) and (pointer: fine) {
        transition: filter 0.3s ease;
        &:hover {
            transition: filter 0.3s ease;
            filter: brightness(0.95);
        }
    }
`;

export const FormError = styled.div`
    ${tw`flex items-center mb-2.5 font-size[14px] text-orange-red`}
    svg {
        ${tw`height[18px] width[18px]`}
        fill: var(--orange-red);
        margin-right: 12px;
    }
`;
