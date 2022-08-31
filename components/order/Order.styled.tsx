import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const fontSizeMain = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter
        lg:(font-size[16.5px] line-height[1em] letter-spacing[-0.06em])
        2lg:(font-size[1.4666667vw])`}

    ${tw`2xl:font-size[22px]`}
`;
export const fontSizeSecondary = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter
        lg:(font-size[13.5px] line-height[1em] letter-spacing[-0.06em])
        2lg:(font-size[1.2vw])`}

    ${tw`2xl:font-size[18px]`}
`;
export const fontSizeTertiary = css`
    ${fontSizeSecondary}
    ${tw`font-size[13px]`}
`;
export const fontSizeTiny = css`
    ${tw`font-size[10px] line-height[1] tracking-tighter
        lg:(font-size[9px] line-height[1.2em])
        2lg:(font-size[0.8vw])`}

    ${tw`2xl:font-size[12px]`}
`;

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

export const Article = styled(motion.article)`
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

export const ImageContainer = styled.a`
    ${tw`relative flex justify-center items-center 
    cursor-pointer width[40vw] padding[0.5em 0 30%]
    lg:(width[12vw] padding-bottom[20%])
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

export const ProductDetails = styled.div`
    ${tw`relative w-full margin-left[1vw] text-primary
    lg:(flex justify-between flex-1)`}

    & > div:first-of-type {
        ${tw`absolute top-0 left-0 flex flex-col max-width[65%] 
        lg:(static flex-row items-start 
            height[max-content] max-width[none] mr-0 order-1)`}

        h2 {
            ${fontSizeMain}
            ${tw`margin-bottom[0.5em] text-primary
            lg:(max-width[11vw] margin-right[6vw])`}
        }

        article {
            ${tw`w-max color[rgb(103, 103, 103)]
            lg:(flex justify-between items-start mt-0.5
                 text-accents-8)`}

            ${fontSizeTertiary}

            & > span:not(:last-of-type) {
                ${tw`margin-right[0.5em]`}
            }

            & > span:first-of-type {
                ${tw`lg:(width[7.5vw] margin-right[1.8vw])`}
            }

            & > span:nth-of-type(2) {
                ${tw`lg:margin-right[6.75vw]`}
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

export const DecorationTop = styled.span<DecorationProps>`
    ${tw`absolute bottom[50%] right-0 block height[3vw] width[12vw] p-0
    lg:(height[2vw] width[8vw])`}
    transform: skewY(-10deg);
    ${(props) => decorationVariant(props.color)};
`;

export const DecorationBottom = styled(DecorationTop)<DecorationProps>`
    ${tw`bottom[calc(50% - 1.8vw)] right[1vw] opacity-80
    lg:bottom[calc(50% - 1.2vw)]`}

    ${(props) => decorationVariant(props.color)};
`;