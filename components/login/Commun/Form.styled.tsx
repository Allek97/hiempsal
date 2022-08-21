import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { motion } from "framer-motion";
import tw from "twin.macro";

export const textSizePlaceholder = css`
    ${tw`font-size[17px] line-height[1.3em] tracking-tighter 
    lg:font-size[15px]
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
