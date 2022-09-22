import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

const titleSize = css`
    ${tw`font-size[20px] tracking-tighter line-height[1.1em]
    lg:(font-size[17.25px] letter-spacing[-0.06em])
    2lg:font-size[1.53333333333333vw]`}

    ${tw`2xl:font-size[23px]`}
`;

export const Root = styled(motion.ul)`
    ${tw`block w-full h-full bg-white`}

    li {
        ${tw`flex items-center py-5`}

        &:first-of-type {
            border-bottom: 2px solid rgb(229, 231, 235);
        }

        &:nth-of-type(2) {
            border-bottom: 1px solid rgb(229, 231, 235);
        }

        h2 {
            ${tw`mb-0.5`}
            ${titleSize}
        }
        span {
            ${({ theme }) => theme.textSize.textSizeMedium}
        }
    }
`;
