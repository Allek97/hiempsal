import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface ArrowProps {
    direction: "left" | "right";
    disabled: boolean;
}

export const Wrapper = styled.div`
    ${tw`w-full h-full`}
`;

export const ImageContainer = styled.div`
    ${tw``}
`;

export const ArrowSvg = styled.svg<ArrowProps>`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    fill: red;
    cursor: pointer;

    ${(props) =>
        props.direction === "left"
            ? css`
                  left: 5px;
              `
            : css`
                  left: auto;
                  right: 5px;
              `}

    ${(props) =>
        props.disabled &&
        css`
            fill: black;
        `}
`;
