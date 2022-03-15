import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import customScroll from "@styles/customScroll.styled";
import tw from "twin.macro";

const riseAnimation = keyframes`
    0% {
        transform: translateY(100%);
        opacity: 0;
    } 100% {
        transform: translateY(0%);
        opacity: 1;
    }
`;

export const Root = styled.aside`
    ${tw`relative block`}
`;

export const Overlay = styled.div`
    ${tw`fixed inset-0 z-index[95] bg-accents-9 opacity-40 pointer-events-auto`}

    cursor: url(/close-cursor-image.svg), pointer;
`;

export const Container = styled.section`
    ${tw`fixed z-index[95] bottom-9 right[4vw] width[94vw] height[80%] bg-primary
     overflow-y-scroll 
    md:(width[55vw] right[0] left[0] mx-auto)
    lg:(bottom-4 height[85%] width[33vw] ml-auto mr-10)
    2xl:(width[32rem])`}

    animation : ${riseAnimation} 0.5s ease-out 1 forwards;

    filter: drop-shadow(rgba(0, 0, 0, 0.15) 1px 1px 3px);
    /* border-top-left-radius: 1.5rem; */

    clip-path: polygon(4.5% 0, 100% 0, 100% 100%, 0 100%, 0 2.5%);

    ${customScroll}
`;

export const CloseWrapper = styled.div`
    ${tw`absolute top-3 right-3 w-4 cursor-pointer z-10
    xl:(py-11 top-0 right-8)`}

    @media (hover:hover) and (pointer: fine) {
        &:hover svg {
            transition: fill 0.3s;
            fill: #e00b25;
            cursor: pointer;
        }
    }
`;
