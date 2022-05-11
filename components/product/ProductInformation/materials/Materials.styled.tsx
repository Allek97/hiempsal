import styled from "@emotion/styled";
import tw from "twin.macro";
import { motion } from "framer-motion";

export const ListBtn = styled(motion.button)`
    ${tw`relative flex justify-between items-center w-full`}
    ${tw`padding[6.7vw 4vw] 
    lg:padding[2vw 1.3333333333vw]
    `}

    border-bottom: 2px solid transparent;

    h3 {
        ${tw`font-semibold text-accents-8
        lg:letter-spacing[-0.06em]`}
    }

    span {
        svg {
            ${tw`width[0.92em] fill[var(--orange-red)]`}
        }
    }
`;

export const ListContent = styled.ul``;
