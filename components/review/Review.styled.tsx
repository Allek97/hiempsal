import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { transientOptions } from "@lib/transientOptions";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { mainFont3 } from "./typography";

interface UtilBtnProps {
    $isSelected: boolean;
}
interface UtilBtnProps {
    $isSelected: boolean;
}
interface FunctionalProps {
    $isSelected: boolean;
}

export const Header = styled.div`
    ${tw`flex w-full bg-grey-light py-6 px-8`}
`;

export const UtilBtn = styled(motion.button, transientOptions)<UtilBtnProps>`
    ${tw`font-size[16px] tracking-tighter cursor-pointer`}

    &:first-of-type {
        ${tw`mr-4`}
    }

    ${({ $isSelected }) =>
        $isSelected
            ? css`
                  ${tw`text-accents-9`}
              `
            : css`
                  ${tw`text-accents-6`}
              `}

    @media (hover: hover) and (pointer: fine) {
        transition: color ease 0.3s;
        &:hover {
            transition: color ease 0.3s;
            ${tw`text-accents-9`}
        }
    }
`;

export const BtnContainer = styled.div`
    ${tw`sticky left-0 bottom-10 z-10 flex w-full py-6 px-8`}
`;

export const FunctionalBtn = styled(Button)<FunctionalProps>`
    ${tw`padding-top[15px] padding-bottom[15px] border-radius[3px]`}
    ${mainFont3}
    box-shadow: 0.785217px 0.785217px 3.14087px rgb(0 0 0 / 28%);

    ${({ $isSelected }) =>
        $isSelected
            ? css`
                  ${tw`bg-secondary text-secondary`}
              `
            : css`
                  ${tw`bg-primary text-primary`}
              `}

    &:first-of-type {
        ${tw`mr-3.5`}
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${({ $isSelected }) =>
                $isSelected
                    ? css`
                          ${tw`bg-primary text-primary`}
                      `
                    : css`
                          ${tw`bg-secondary text-secondary`}
                      `}
        }

        &:focus {
            ${tw`outline-none`}
        }
    }
`;
