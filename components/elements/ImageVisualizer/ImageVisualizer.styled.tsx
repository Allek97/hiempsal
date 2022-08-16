import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const VariantVisualizerBox = styled.div`
    ${tw`flex justify-center items-center w-max gap[1.5vw]
    lg:(pt-3 gap[0.2666666667vw])`}
`;

export const VariantVisualizers = styled(motion.button)`
    ${tw`relative w-9 h-9 border-radius[3px]
    lg:(w-10 h-10)`}

    box-shadow: 1px 1px 2px rgb(0 0 0 / 10%);
`;
