import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";
import {
    fontSizeMain,
    fontSizeTertiary,
    fontSizeTiny,
} from "../utils/typography.styled";

type DecorationColor = "light" | "medium" | "dark";

interface DecorationTopProps {
    color: string;
}
interface DecorationBottomProps {
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

export const Article = styled(motion.article)`
    ${tw`flex justify-between h-full w-full padding-bottom[1em]
         overflow-y-hidden tracking-tighter
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

export const ImageContainer = styled.a`
    ${tw`relative flex justify-center items-center 
    cursor-pointer width[40vw] padding[0.5em 0 30%]
    lg:(flex-shrink[0] width[12vw] padding-bottom[20%])
    4xl:width[13.5vw]`}

    span,
    img {
        width: 100% !important;
    }

    span {
        padding: 118% 0px 0px !important;
    }
`;

////////////////////////////////////////////////////////
// TODO: Clean the code
////////////////////////////////////////////////////////

interface ProductDetailsProps {
    isTech?: boolean;
}

export const ProductDetails = styled.div<ProductDetailsProps>`
    ${tw`relative w-full margin-left[1vw] text-primary
    lg:(flex justify-between flex-1)`}

    & > div:first-of-type {
        ${tw`absolute top-0 left-0 flex flex-col 
        max-width[65%] flex[1]
        lg:(static flex-row items-start 
            height[max-content] max-width[none] mr-0 order-1)`}

        h2 {
            ${fontSizeMain}
            ${tw`margin-bottom[0.5em] text-primary
            lg:(max-width[11vw] margin-right[3vw])`}
        }

        article {
            ${tw`w-max color[rgb(103, 103, 103)]
            lg:(flex justify-between items-start mt-0.5 flex-1
                 max-width[65%] text-accents-8)`}

            ${({ isTech }) =>
                isTech
                    ? css`
                          ${tw`flex flex-col w-full space-y-1 sm:space-y-3 lg:(flex-row space-y-0)`}

                          & > span {
                              ${tw`max-width[max-content]`}
                          }
                      `
                    : css`
                          & > span {
                              ${tw`max-width[fit-content]`}
                          }
                      `}

            ${fontSizeTertiary}
         

            & > span:first-of-type {
                ${tw`mr-3 lg:mr-5`}
            }

            & > span:nth-of-type(2) {
                ${tw`mr-3 lg:mr-5`}
            }
        }
    }
    & > div:nth-of-type(2) {
        ${tw`absolute top-0 right-0 flex flex-col items-end leading-5 
        lg:(static order-4 )`}
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

export const DecorationTop = styled.span<DecorationTopProps>`
    ${tw`absolute bottom[50%] right-0 block height[3vw] width[12vw] p-0
    lg:(height[2vw] width[8vw])`}
    transform: skewY(-10deg);
    background-color: ${({ color }) => color};
`;

export const DecorationBottom = styled(DecorationTop)<DecorationBottomProps>`
    ${tw`bottom[calc(50% - 1.8vw)] right[1vw] opacity-80
    lg:bottom[calc(50% - 1.2vw)]`}

    ${(props) => decorationVariant(props.color)};
`;
