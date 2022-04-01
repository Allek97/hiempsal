import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const Root = styled(motion.div)`
    ${tw`relative grid items-center grid-template-columns[minmax(auto,50%) minmax(auto,50%)]
    w-full height[4.2rem] border-radius[3px] bg-primary`}

    transition: transform .5s cubic-bezier(.19,1,.22,1),background .4s cubic-bezier(.19,1,.22,1) .2s;
    -webkit-clip-path: polygon(92% 0, 0 0, 0 100%, 100% 100%, 100% 10%);
    clip-path: polygon(92% 0, 0 0, 0 100%, 100% 100%, 100% 10%);
`;
