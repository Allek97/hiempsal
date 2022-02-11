/* eslint-disable no-use-before-define */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ArrowProps {
    disabled: boolean;
    isScreenLarge: boolean;
}

interface IndicatorSlideProps {
    isActive: boolean;
}

const arrowCss = css`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    fill: #006bbd;
    cursor: pointer;
    transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1);
`;

export const ArrowSvgLeft = styled(MdKeyboardArrowLeft)<ArrowProps>`
    ${arrowCss}
    left: 0px;

    opacity: ${(props) => (props.isScreenLarge ? 0 : 1)};

    ${(props) =>
        props.disabled &&
        css`
            fill: grey;
        `};
`;

export const ArrowSvgRight = styled(MdKeyboardArrowRight)<ArrowProps>`
    ${arrowCss}
    left: auto;
    right: 0px;

    opacity: ${(props) => (props.isScreenLarge ? 0 : 1)};

    ${(props) =>
        props.disabled &&
        css`
            fill: grey;
        `};
`;

export const Indicator = styled.div`
    ${tw`absolute top-0 flex w-full opacity-0`}

    transition: opacity .5s cubic-bezier(1,0,0,1);
`;

export const IndicatorSlide = styled.div<IndicatorSlideProps>`
    ${tw`height[3px] w-full background-color[#191919]`}

    background-color: ${(props) =>
        props.isActive ? "#191919" : "var(--accents-3)"};

    &:not(:last-of-type) {
        ${tw`mr-1`}
    }
`;

export const Wrapper = styled.div`
    ${tw`relative w-full h-full py-9`}

    &:hover {
        ${ArrowSvgLeft},${ArrowSvgRight},${Indicator} {
            /* transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1); */
            transition: opacity 0.5s cubic-bezier(1, 0, 0, 1);
            opacity: 1;
        }
    }
`;

export const ImageContainer = styled.div`
    ${tw`cursor-pointer`}
`;
