/* eslint-disable no-use-before-define */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

interface ArrowProps {
    disabled: boolean;
    isScreenLarge: boolean;
}

interface IndicatorSlideProps {
    isActive: boolean;
    direction: "left" | "right" | "center";
}

const arrowCss = css`
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    fill: #006bbd;
    cursor: pointer;
    transition: opacity 0.5s cubic-bezier(1, 0, 0, 1);
`;

export const ArrowSvgLeft = styled(HiArrowNarrowLeft)<ArrowProps>`
    ${arrowCss}
    left: 0px;

    opacity: ${(props) => (props.isScreenLarge ? 0 : 1)};

    ${(props) =>
        props.disabled &&
        css`
            fill: grey;
        `};
`;

export const ArrowSvgRight = styled(HiArrowNarrowRight)<ArrowProps>`
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
    ${tw`transition-transform relative height[3px] flex w-full bg-accents-3`}

    /* background-color: ${(props) =>
        props.isActive ? "#191919" : "var(--accents-3)"}; */

    &:not(:last-of-type) {
        ${tw`mr-1`}
    }

    &:before {
        content: "";
        ${tw`transition-transform absolute left-0 h-full w-full mr-1`}

        transform: scaleX(0);
        transform-origin: ${(props) =>
            props.direction === "left" ? "right" : "left"};

        ${(props) =>
            props.direction === "center" &&
            css`
                transform-origin: center;
            `};

        ${(props) =>
            props.isActive
                ? css`
                      background-color: #191919;
                      transform: scaleX(100%);
                  `
                : css`
                      transform: scaleX(0);
                      background-color: var(--accents-3);
                  `};
    }
`;

export const Wrapper = styled.div`
    ${tw`relative w-full h-full py-9 user-select[none]`}

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
