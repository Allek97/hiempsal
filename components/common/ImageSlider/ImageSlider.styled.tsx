/* eslint-disable no-use-before-define */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ArrowProps {
    disabled: boolean;
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
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1);
`;

export const ArrowSvgLeft = styled(MdKeyboardArrowLeft)<ArrowProps>`
    ${arrowCss}
    left: 0px;

    ${(props) =>
        props.disabled &&
        css`
            fill: grey;
        `}
`;

export const ArrowSvgRight = styled(MdKeyboardArrowRight)<ArrowProps>`
    ${arrowCss}
    left: auto;
    right: 0px;

    ${(props) =>
        props.disabled &&
        css`
            fill: grey;
        `}
`;

export const Wrapper = styled.div`
    ${tw`w-full h-full`}

    &:hover {
        ${ArrowSvgLeft},${ArrowSvgRight} {
            transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1);
            opacity: 1;
        }
    }
`;

export const ImageContainer = styled.div`
    ${tw`cursor-pointer`}
`;
