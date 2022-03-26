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
    ${tw`fixed z-index[95] bottom-10 right[15px]
    border-radius[5px] bg-primary overflow-y-auto 
    lg:(right[2.6666666667vw] bottom[1.3333333333vw] border-radius[0px])`}

    // Dimensions
    ${tw`(width[calc(100% - 30px)] height[calc(90vh - 4.2rem)]) 
    md:(height[calc(85vh - 4.2rem)])
    lg:width[28vw]
    2xl:width[21vw]`}

    animation : ${riseAnimation} 0.5s ease-out 1 forwards;

    filter: drop-shadow(rgba(0, 0, 0, 0.15) 1px 1px 3px);
    /* border-top-left-radius: 1.5rem; */
    @media only screen and (min-width: 64em) {
        clip-path: polygon(4.5% 0, 100% 0, 100% 100%, 0 100%, 0 3%);
        ${customScroll}
    }
`;

export const CloseWrapper = styled.div`
    ${tw`absolute top-8 right-3 w-3.5 cursor-pointer z-10
    xl:(right-8)`}

    @media (hover:hover) and (pointer: fine) {
        &:hover svg {
            transition: fill 0.3s;
            fill: #e00b25;
            cursor: pointer;
        }
    }
`;
