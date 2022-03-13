import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    isDisplayed: boolean;
}

interface ProductBtnProps {
    isWishlist: boolean;
    isAddedToWishlist: boolean;
}

interface ImageProps {
    imageSize: "A" | "B";
    isDisplayed: boolean;
}

interface InfoProps {
    textLayout: "A" | "B";
    isDisplayed: boolean;
}

const ImageSizeA = css`
    ${tw`height[35vw]
        lg:height[25vw]
        3xl:height[36.8vw]`}
`;
const ImageSizeB = css`
    ${tw`height[90vw]
        md:height[75vw]
        lg:height[35vw]
        3xl:height[36.8vw]`}
`;
const imageSizeDisplay = css`
    ${tw`height[90vw]
        md:height[75vw]
        lg:height[65vw]
        3xl:height[55vw]`}
`;

const productInfoTypoA = css`
    h6 {
        ${tw`lg:font-size[9px]
        2lg:font-size[0.8vw]`}

        ${tw`2xl:(font-size[12px])`}
    }

    h3 {
        ${tw`font-size[12.5px] 
        lg:font-size[18.5px]
        xl:font-size[1.45vw]
        3xl:font-size[23px]`}
    }

    span {
        ${tw`font-size[11px]
        lg:font-size[13px]
        xl:font-size[1.1vw]
        3xl:font-size[17.5px]`}
    }
`;

const productInfoTypoB = css`
    h6 {
        ${tw`lg:font-size[9px]
        2lg:font-size[0.8vw]`}

        ${tw`2xl:(font-size[12px])`}
    }

    h3 {
        ${tw`font-size[18px] 
        lg:font-size[18.5px]
        xl:font-size[1.45vw]
        3xl:font-size[23px]`}
    }

    span {
        ${tw`font-size[13px] letter-spacing[-0.04em] line-height[1.3em]
        lg:font-size[11.25px]
        2lg:font-size[1vw]`}

        ${tw`2xl:font-size[15px] `}
    }
`;

const productInfoTypoisDisplayed = css`
    h3 {
        ${tw`lg:(font-size[22.5px] width[calc(100% - 4vw)] line-height[1.1em] tracking-tighter)
        2lg:font-size[2vw]`}

        ${tw`2xl:font-size[30px] `}
    }
`;

const imageSizeObj = {
    A: ImageSizeA,
    B: ImageSizeB,
};

const productInfoTypoObj = {
    A: productInfoTypoA,
    B: productInfoTypoB,
};

export const Root = styled.li`
    ${tw`list-none`}
`;

export const ProductWrapper = styled.article<Props>`
    ${tw`flex flex-col`}
    ${(props) =>
        props.isDisplayed &&
        css`
            ${tw`lg:(flex flex-row items-center)`}
        `}
`;

export const ImageContainer = styled.div<Props>`
    ${tw`relative flex justify-center items-center w-full bg-accents-1 cursor-pointer`}

    ${(props) =>
        props.isDisplayed &&
        css`
            ${tw`lg:(width[62.6666666667vw] mr-12)`}
        `}
`;

export const ProductImageWrapper = styled.div<ImageProps>`
    ${tw`flex justify-center items-center mx-3`}

    width: 70%;

    & > div:first-of-type {
        ${tw`w-full mx-4 
        xs:mx-8
      `}

        ${(props) =>
            props.isDisplayed
                ? imageSizeDisplay
                : imageSizeObj[props.imageSize]}
    }
`;

/////////////////////////////////////////////
// Product product information
/////////////////////////////////////////////

export const ProductInfo = styled.div<InfoProps>`
    ${tw`relative flex flex-col padding[2vw 2vw 0] capitalize
    lg:p-0`}

    ${(props) => productInfoTypoObj[props.textLayout]}

    ${(props) =>
        props.isDisplayed
            ? css`
                  ${productInfoTypoisDisplayed}

                  h3 {
                      ${tw`margin[6px 0]
                    lg:(margin[0.25rem 0 0.3rem] w-max mr-16 -ml-0.5)`}
                  }

                  & > span {
                      ${tw`margin-bottom[0.5em]`}
                  }
              `
            : css`
                  h3 {
                      ${tw`margin[6px 0] 
                    lg:(margin[0.35em 0 0.5em] w-max mr-16)`}
                  }

                  & > span {
                      ${tw`margin-bottom[0.5em]`}
                  }
              `}

    h6 {
        ${tw`text-accents-6 mt-5`}
    }

    h3 {
        transform-origin: center bottom;
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);

        ${tw`pr-2 
        text-accents-9 tracking-tighter cursor-pointer 
        lg:(w-max mr-16)`}
    }

    & > span {
        color: black;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover h3 {
            transform-origin: center bottom;
            transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);

            transform: skew(-10deg);
        }
    }
`;

export const ProductBtn = styled.button<ProductBtnProps>`
    ${tw`padding-top[1vw] margin-top[0.8vw] font-size[1.15em] cursor-pointer
    lg:(mt-4 pt-1)
    3xl:(font-size[1.8rem])`}

    svg {
        ${(props) =>
            props.isWishlist &&
            css`
                fill: red;
            `}

        ${(props) =>
            !props.isWishlist &&
            css`
                fill: ${props.isAddedToWishlist ? "red" : "currentColor"};
            `}
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover svg {
        transform: scale(0.9);
    }
`;

export const ProductBonus = styled.div`
    ${tw`flex items-center cursor-pointer w-max`}

    svg {
        ${tw`mr-2 font-size[15px]
        lg:font-size[1.7vw]
        2xl:(font-size[24px])`}
    }

    p {
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover p {
        transform: skewX(-10deg);
    }
`;

export const AddToCartBtn = styled(Button)`
    ${tw`padding-top[3.7vw] padding-bottom[3.7vw] margin[4vw 0 0] border border-accents-1 
    bg-white capitalize text-primary tracking-tighter
    lg:(mt-7 mb-0 py-12)`}

    box-shadow: 1px 1px 3px rgb(0 0 0 / 14%);
`;

export const QuickViewBtn = styled.button`
    ${tw`flex items-center space-x-2 w-max`}
`;
