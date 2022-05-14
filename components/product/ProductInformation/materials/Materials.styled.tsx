import styled from "@emotion/styled";
import tw from "twin.macro";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { transientOptions } from "@lib/transientOptions";

interface ListBtnProps {
    $isOpen: boolean;
}

export const ListBtn = styled(motion.button, transientOptions)<ListBtnProps>`
    ${tw`relative flex justify-between items-center w-full`}
    ${tw`padding[6.7vw 4vw] 
    lg:padding[2vw 1.3333333333vw]
    `}

    border-bottom: 2px solid hsla(0,0%,80%,.3);

    h3 {
        ${tw`font-semibold text-accents-8
        lg:letter-spacing[-0.06em]`}
    }

    span {
        svg {
            ${tw`width[0.92em] fill[var(--orange-red)]`}

            path:first-of-type {
                transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                transform-origin: center;
                ${({ $isOpen }) =>
                    $isOpen &&
                    css`
                        transform: rotate(-90deg);
                    `};
            }
        }
    }
`;

export const ListContent = styled.ul``;
