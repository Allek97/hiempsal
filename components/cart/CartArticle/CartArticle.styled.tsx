import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

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
    ${tw`flex h-full w-full mt-4 text-base overflow-y-hidden tracking-tighter
        pt-4 border-t-accents-7`}

    &:first-of-type {
        ${tw`border-t-2`}
    }

    border-bottom: 2px solid var(--accents-3);
`;

export const Separator = styled.hr`
    ${tw`mt-6 bg-secondary`}
    height : 3px;
`;

////////////////////////////////////////////////////////
// TODO: Product Display
////////////////////////////////////////////////////////

export const ProductImage = styled.div`
    ${tw`flex justify-center items-center mr-3 
    border-t-8 border-accents-0 cursor-pointer
    lg:width[35%]`}

    width: 70%;
    max-width: 14rem;

    & > div:first-of-type {
        ${tw`w-full mx-4 xs:mx-8`}
    }
`;

////////////////////////////////////////////////////////
// TODO: Clean the code
////////////////////////////////////////////////////////

export const ProductDetails = styled.div`
    ${tw`relative w-full text-primary 
    lg:(flex justify-between)`}

    & > div:first-of-type {
        ${tw`absolute top-0 left-0 flex flex-col mr-20
        lg:(static flex-row items-start height[max-content] mr-0 order-1)`}

        h2 {
            ${tw`pb-2 cursor-pointer font-size[17px] line-height[1.15em]
            lg:(width[35%] margin-right[4vw] pb-0)
            xl:(margin-right[6vw] font-size[1.4vw] letter-spacing[-.06em])
            3xl:(font-size[24px])`}
        }

        p {
            ${tw`w-max text-sm text-accents-7 space-x-3
            lg:(flex justify-between items-center mt-0.5 width[20%] font-size[16px] letter-spacing[-.06em] text-accents-8)
            xl:(font-size[1.25vw])
            2xl:(font-size[1.15vw])
            3xl:(font-size[22px])`}

            span:first-of-type {
                ${tw`uppercase
                lg:(margin-right[4vw])
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
        lg:(static order-4 mt-2 font-size[16px])
        xl:(font-size[1.25vw])
        2xl:(font-size[1.1vw])
        3xl:(font-size[20px])`}
    }
    & > div:nth-of-type(3) {
        ${tw`absolute bottom-0 left-0 mb-5 w-full leading-3 cursor-pointer
        lg:(w-max)`}
    }
    & > div:nth-of-type(4) {
        ${tw`absolute bottom-0 right-0 mb-5 cursor-pointer
        lg:(static height[max-content] margin-right[2.5vw] mb-0 mt-1 order-2)`}
    }
`;

export const RemoveBtn = styled.button`
    ${tw`flex items-center justify-center transition-opacity 
    font-size[0.85rem] text-red font-medium opacity-80 hover:(opacity-100 font-size[0.9rem])`}
    letter-spacing: -.05em;

    svg {
        ${tw`mr-1`}
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

    &:hover:after {
        transform: scaleX(1);
        transform-origin: 0;
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
