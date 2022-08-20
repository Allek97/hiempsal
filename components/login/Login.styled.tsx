import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { transientOptions } from "@lib/transientOptions";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const textSizeTitle = css`
    ${tw`font-size[28px] line-height[1.3em] tracking-tight 
    lg:font-size[36px]
    2lg:font-size[3.2vw]`}

    ${tw`2xl:font-size[48px]`}
`;

export const textSizeInactive = css`
    ${tw`font-size[16px] line-height[1.3em] tracking-tighter 
    lg:font-size[14.5px]
    2lg:font-size[1.3333333333vw]`}

    ${tw`2xl:font-size[20px]`}
`;
export const textSizePlaceholder = css`
    ${tw`font-size[17px] line-height[1.3em] tracking-tighter 
    lg:font-size[15px]
    2lg:font-size[1.4vw]`}

    ${tw`2xl:font-size[20px]`}
`;

interface UtilityBtnProps {
    $isActive: boolean;
}

export const Main = styled.main`
    ${tw`block w-full min-h-screen
    background-color[#f5f5f5]`}

    ${({ theme }) => theme.layout.mainPadding}
`;

export const LoginForm = styled.form`
    ${tw`flex flex-col padding[7rem 0] max-width[520px] mx-auto`}

    h1 {
        ${tw`margin-bottom[3rem] font-size[28px]`}
        ${textSizeTitle}
    }
`;

export const UtilityBtn = styled(
    motion.button,
    transientOptions
)<UtilityBtnProps>`
    ${tw`flex items-center justify-between padding[0.6em 1.5em] w-max`}

    ${({ $isActive }) =>
        $isActive
            ? css`
                  ${tw`flex border-radius[500px] bg-white`}
                  box-shadow: 1px 1px 3px rgb(0 0 0 / 17%);
                  border: 1px solid #f0f0f0;
              `
            : css`
                  ${tw`color[#676767]`}
                  ${textSizeInactive}
                  svg {
                      display: none;
                  }
              `}
`;

export const FormLabel = styled(motion.label)`
    ${tw`relative`}
`;

export const FormInput = styled(motion.input)`
    ${tw`padding[25px 20px 13px] w-full height[52px]
    border-radius[3px] bg-white font-bold`}

    ${textSizePlaceholder}
    box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
    border: 1.5px solid #f0f0f0;

    &:focus + span {
        transition: transform 0.3s ease, font-size 0.3s ease;
        transform: translateY(-35%);
        font-size: 10px;
        left: 22px;
    }
    &:focus {
        outline: none;
    }
`;

export const InputPlaceholder = styled(motion.span)`
    ${tw`absolute left[20px] top[-11px] z-10 line-height[0]
    text-grey font-size[17px] cursor-text`}

    transition: transform 0.3s ease, font-size 0.3s ease;
    ${textSizePlaceholder}

    user-select: none;
`;

export const ForgotPassword = styled(motion.button)`
    ${tw`flex flex-col ml-auto w-max font-size[10px]`}

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
    ${tw`padding[1em 0] margin[0.25em] font-bold`}
`;

export const ImageWrapper = styled.div`
    ${tw`display[none] lg:relative`}
`;
