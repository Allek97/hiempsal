import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import {
    fontSizeMain,
    fontSizeTertiary,
    fontSizeTiny,
} from "../utils/typography.styled";

type DecorationColor = "light" | "medium" | "dark";

interface DecorationProps {
    color?: DecorationColor;
}

const decorationVariant = (variant: DecorationColor = "medium") => {
    switch (variant) {
        case "light":
            return css`
                background-color: var(--accents-3);
            `;
        case "medium":
            return css`
                background-color: var(--accents-6);
            `;

        case "dark":
            return css`
                background-color: var(--accents-9);
            `;

        default:
            return css`
                background-color: var(--accents-6);
            `;
    }
};

////////////////////////////////////////////////////////
// TODO: Product Display
////////////////////////////////////////////////////////

export const Article = styled.article`
    ${tw`flex h-full w-full padding-bottom[1em] overflow-y-hidden tracking-tighter
        pt-4 border-t-accents-9 text-base`}

    &:first-of-type {
        ${tw`mt-4 border-t-2`}
    }

    border-bottom: 1px solid var(--accents-2);
`;

export const Separator = styled.hr`
    ${tw`mt-6 bg-secondary`}
    height : 3px;
`;

////////////////////////////////////////////////////////
// TODO: Product Display
////////////////////////////////////////////////////////

export const ImageContainer = styled.div`
    ${tw`relative flex justify-center items-center 
    cursor-pointer width[40vw] padding[0.5em 0 30%]`}

    span,
    img {
        ${tw`w-full h-full`}
    }

    span {
        padding: 118% 0px 0px !important;
    }
`;

////////////////////////////////////////////////////////
// TODO: Clean the code
////////////////////////////////////////////////////////

export const ProductDetails = styled.div`
    ${tw`relative w-full text-primary margin-left[1em] 
    lg:(flex justify-between)`}

    & > div:first-of-type {
        ${tw`absolute top-0 left-0 flex flex-col max-width[65%] 
        lg:(static flex-row items-start height[max-content] mr-0 order-1)`}

        h2 {
            ${fontSizeMain}
            ${tw`margin-bottom[0.5em] text-primary`}
        }

        article {
            ${tw`w-max color[rgb(103, 103, 103)] space-x-3
            lg:(flex justify-between items-center mt-0.5 width[20%] text-accents-8)`}

            ${fontSizeTertiary}

            span:first-of-type {
                ${tw`lg:(margin-right[4vw])
                2xl:(margin-right[6vw])`}
            }

            span:nth-of-type(2) {
                ${tw`xl:font-size[1.2vw]
                2xl:(font-size[1.1vw])
                3xl:(font-size[21px])`}
            }
        }
    }
    & > div:nth-of-type(2) {
        ${tw`absolute top-0 right-0 flex flex-col items-end leading-5 
        lg:(static order-4 mt-2)`}
    }
    & > div:nth-of-type(3) {
        ${tw`absolute bottom-0 left-0 w-full leading-3 cursor-pointer
        lg:(w-max)`}
    }
    & > div:nth-of-type(4) {
        ${tw`absolute bottom-0 right-0 cursor-pointer
        lg:(static height[max-content] margin-right[2.5vw] mb-0 mt-1 order-2)`}
    }
`;

export const RemoveBtn = styled.button`
    ${tw`flex items-center justify-center w-max transition-opacity
    text-red`}

    ${fontSizeTiny}

    ${({ theme }) =>
        theme.device.isTouch
            ? css`
                  ${tw`opacity-100`}
              `
            : css`
                  ${tw`opacity-80`}
              `}

    @media (hover:hover) and (pointer:fine) {
        opacity: 100;
    }

    svg {
        ${tw`mr-0.5`}
    }

    &:after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 1px;
        width: 100%;
        background: #e00b25;
        transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        transform: scaleX(0);
        transform-origin: 100% 100%;
    }
    @media (hover: hover) and (pointer: fine) {
        &:hover:after {
            transform: scaleX(1);
            transform-origin: 0;
        }
    }
`;

export const DecorationTop = styled.span<DecorationProps>`
    position: absolute;
    bottom: 3vw;
    right: 0;

    display: block;
    height: 2vw;
    width: 8vw;
    padding: 0px;
    transform: skewY(-10deg);
    ${(props) => decorationVariant(props.color)};
`;

export const DecorationBottom = styled(DecorationTop)<DecorationProps>`
    bottom: 1.5vw;
    right: 2rem;

    ${(props) => decorationVariant(props.color)};
    opacity: 0.8;
`;
