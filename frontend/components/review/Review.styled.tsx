import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { transientOptions } from "@lib/transientOptions";
import { motion } from "framer-motion";
import tw from "twin.macro";

interface UtilBtnProps {
    $isSelected: boolean;
}
interface UtilBtnProps {
    $isSelected: boolean;
}

export const Header = styled.div`
    ${tw`flex w-full bg-grey-light py-6 px-6
    sm:px-8`}
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

export const ReviewOverview = styled.div`
    ${tw`flex items-center w-max pt-16 pb-10 mx-auto
    lg:(pt-10 pb-7)`}

    & > h3 {
        ${tw`font-size[60px] tracking-tight`}
    }
`;

export const BtnContainer = styled.div`
    ${tw`sticky left-0 bottom-10 z-10 flex w-full py-6 px-6
    sm:px-8`}
`;
