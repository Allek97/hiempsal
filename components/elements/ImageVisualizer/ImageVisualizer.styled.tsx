import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { transientOptions } from "@lib/transientOptions";
import { motion } from "framer-motion";
import tw from "twin.macro";

interface VisualProps {
    $variant: "product" | "userlist";
}

const sizeA = css`
    ${tw`w-9 h-9
    lg:(w-10 h-10)`}
`;
const sizeB = css`
    ${tw`w-9 h-9
    lg:(width[2.6vw] height[2.6vw])
    2xl:(width[2.1vw] height[2.1vw])`}
`;

export const VariantVisualizerBox = styled.div`
    ${tw`flex flex-wrap items-center w-full gap[1.5vw]
    lg:(pt-3 gap[0.2666666667vw])`}
`;

export const VariantVisualizers = styled(
    motion.button,
    transientOptions
)<VisualProps>`
    ${tw`relative border-radius[3px]`}

    box-shadow: 1px 1px 2px rgb(0 0 0 / 10%);

    ${({ $variant }) => ($variant === "product" ? sizeA : sizeB)}
`;
