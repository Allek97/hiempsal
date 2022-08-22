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
    background-color[#f5f5f5]
    lg:(flex)`}
`;

export const ImageWrapper = styled.div`
    ${tw`display[none]
    lg:(relative block w-1/2 h-auto)
    2xl:w-2/3`}
`;

export const AccountContainer = styled.div`
    ${tw`flex flex-col padding[7rem 0] max-width[520px] mx-auto
    lg:(w-1/2 padding[12rem 0 0] max-width[100%])
    2xl:w-1/3`}

    h1 {
        ${tw`margin-bottom[3rem]
        lg:margin-bottom[5rem]`}
        ${textSizeTitle}
    }

    ${({ theme }) => theme.layout.mainPadding}
`;

export const UtilityBtn = styled(
    motion.button,
    transientOptions
)<UtilityBtnProps>`
    ${tw`flex items-center justify-between padding[0.7em 1.5em] w-max`}

    ${({ $isActive }) =>
        $isActive
            ? css`
                  ${tw`flex border-radius[500px] bg-white font-size[15px]`}
                  box-shadow: 1px 1px 3px rgb(0 0 0 / 17%);
                  border: 1px solid #f0f0f0;
              `
            : css`
                  ${tw`color[#676767] font-size[16px]`}
                  svg {
                      display: none;
                  }
              `}
`;
