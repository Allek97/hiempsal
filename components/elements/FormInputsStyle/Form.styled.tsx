import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { transientOptions } from "@lib/transientOptions";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const textSizePlaceholder = css`
    ${tw`font-size[17px] line-height[1.3em] tracking-tighter 
    lg:(font-size[15px] tracking-tight )
    2lg:font-size[1.4vw]`}

    ${tw`2xl:font-size[20px]`}
`;

export const FormInput = styled(motion.input)`
    ${tw`padding[29px 20px 9px] w-full height[52px] 
    border-radius[3px] bg-white font-bold
    lg:height[45px]
    xl:height[60px]`}

    ${textSizePlaceholder}
    box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
    border: 1.5px solid #f0f0f0;

    &:focus + span,
    &:not(:placeholder-shown) + span {
        transition: transform 0.3s ease, font-size 0.3s ease;
        transform: translateY(-35%);
        font-size: 10px;
        left: 22px;
        ${tw`lg:font-size[12px]`}
    }
    &:focus {
        outline: none;
    }
`;

export const FormCountryContainer = styled(motion.div)`
    ${tw`relative w-full height[52px] padding[29px 20px 9px] 
    bg-white
    lg:height[45px]
    xl:height[60px]`}

    box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
    border: 1px solid #f0f0f0;
    border-radius: 3px;
    transition: background 0.3s, border 0.3s, transform 0.3s;
`;

export const FormSelectCountry = styled(motion.select)`
    ${tw`absolute top-0 left-0 z-10 w-full h-full opacity-0 
    cursor-pointer`}

    -webkit-appearance: menulist-button;

    &:focus {
        outline-color: "transparent";
    }

    &:select {
        background-color: red;
    }
`;

interface CountryProps {
    $isSelected: boolean;
}

export const CountryPlaceholder = styled(
    motion.span,
    transientOptions
)<CountryProps>`
    ${tw`absolute left[20px] top[13px] line-height[0]
    text-grey font-size[17px] cursor-text
    lg:top[11px]
    xl:top[17px]`}

    transition: transform 0.3s ease, font-size 0.3s ease;
    ${textSizePlaceholder}

    ${({ $isSelected }) =>
        $isSelected &&
        css`
            ${tw`lg:font-size[12px]`}
            transition: transform 0.3s ease, font-size 0.3s ease;
            transform: translateY(-40%);
            font-size: 10px;
            left: 22px;
        `}

    

    user-select: none;
`;
export const CountryValue = styled(motion.span)`
    ${tw`absolute left[20px] top[22px]
    lg:top[18px]
    xl:top[21px]`}

    transition: transform 0.3s ease, font-size 0.3s ease;
    ${({ theme }) => theme.textSize.textSizeLarge}

    user-select: auto;
`;

export const InputPlaceholder = styled(motion.span)`
    ${tw`absolute left[20px] top[-15px] z-10 line-height[0]
    text-grey font-size[17px] cursor-text`}

    transition: transform 0.3s ease, font-size 0.3s ease;
    ${textSizePlaceholder}

    user-select: none;
`;

export const ForgotPassword = styled(motion.button)`
    ${tw`flex flex-col ml-auto w-max font-size[10px] text-accents-8
    xl:font-size[12px]`}

    &:after {
        ${tw`content w-1/2 height[1px] mt-0.5 ml-auto bg-accents-7`}
        transition: width 0.3s ease;
    }
    @media (hover: hover) and (pointer: fine) {
        &:hover:after {
            ${tw`w-full`}
            transition: width 0.3s ease;
        }
    }
`;

export const FormSubmitBtn = styled(Button)`
    ${tw`padding[1em 0] margin[0.25em] font-bold
    xl:padding[1.2em 0]`}
`;

export const PhoneInputContainer = styled.div`
    ${tw`relative`}
    .react-tel-input .form-control {
        ${tw`font-family[HelveticaNowText]`}
        ${({ theme }) => theme.textSize.textSizeMain}
    }
    .react-tel-input .form-control:focus {
        outline: none !important;
        border: none;
        box-shadow: none;
    }
    .form-control {
        ${tw`padding[29px 20px 9px] height[52px]
        border-radius[3px] bg-white font-bold
        lg:height[45px]
        xl:height[60px]`}

        width: 100% !important;

        box-shadow: 1px 1px 3px rgb(0 0 0 / 10%) !important;
        border: 1.5px solid #f0f0f0 !important;

        &::placeholder {
            ${tw`font-normal text-grey`}
            ${textSizePlaceholder}
        }
    }
    @media (hover: hover) and (pointer: fine) {
        .react-tel-input .form-control:hover {
            background-color: #f0f0f0 !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
            transition: all 0.15s linear;
            outline: none;
        }
    }

    .special-label {
        display: none !important;
    }

    .country-list {
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
        }
    }
`;

export const ErrorForm = styled.div`
    span {
        ${({ theme }) => theme.textSize.textSizeSmall}
    }
`;
