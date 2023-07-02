import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface ButtonProps {
    isDisabled?: boolean;
}

const fontSizeMain = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter`}
`;

export const Root = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    background: #fff;
    border: 2px solid #f0f0f0;
    box-sizing: border-box;
    box-shadow: 1px 3px 5px rgb(0 0 0 / 2%);
    border-radius: 5px;
    padding: 4px 5px;

    ${fontSizeMain}
    span {
        ${tw`margin[0 0.5em]`}
    }
`;

export const UtilityBtn = styled.button<ButtonProps>`
    ${tw`flex items-center justify-center width[15px] height[15px]
        cursor-pointer text-center user-select[none]`}

    ${({ isDisabled = false }) =>
        isDisabled &&
        css`
            pointer-events: none;
            opacity: 0.25;
        `}
`;
