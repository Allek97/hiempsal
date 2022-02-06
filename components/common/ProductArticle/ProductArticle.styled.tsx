import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    onDisplay: boolean;
}

interface ProductBtnProps {
    isWishlist: boolean;
    isAddedToWishlist: boolean;
}

interface ImageProps {
    imageSize: "A" | "B";
    onDisplay: boolean;
}

interface InfoProps {
    textLayout: "A" | "B";
    onDisplay: boolean;
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

const textSizeA = css`
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

const textSizeB = css`
    h3 {
        ${tw`font-size[18px] 
        lg:font-size[18.5px]
        xl:font-size[1.45vw]
        3xl:font-size[23px]`}
    }

    span {
        ${tw`font-size[12px]
        lg:font-size[13px]
        xl:font-size[1.1vw]
        3xl:font-size[17.5px]`}
    }
`;

const textSizeOnDisplay = css`
    h3 {
        ${tw`font-size[18px]
        lg:(font-size[2.5vw] width[75%] leading-tight)
        xl:(font-size[2.8vw] width[70%])
        3xl:(font-size[40px] width[55%])`}
    }
`;

const imageSizeObj = {
    A: ImageSizeA,
    B: ImageSizeB,
};

const textSizeObj = {
    A: textSizeA,
    B: textSizeB,
};

export const Root = styled.li`
    ${tw`list-none`}
`;

export const Product = styled.article<Props>`
    ${tw`flex flex-col`}
    ${(props) =>
        props.onDisplay &&
        css`
            ${tw`lg:(flex flex-row items-center)`}
        `}
`;

export const ImageContainer = styled.div<Props>`
    ${tw`relative flex justify-center items-center w-full bg-accents-1 cursor-pointer`}

    ${(props) =>
        props.onDisplay &&
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
            props.onDisplay ? imageSizeDisplay : imageSizeObj[props.imageSize]}
    }
`;

/////////////////////////////////////////////
// Product product information
/////////////////////////////////////////////

export const ProductInfo = styled.div<InfoProps>`
    ${tw`relative flex flex-col padding[2vw 2vw 0] capitalize
    lg:p-0`}

    h6 {
        ${tw`text-accents-6 mt-4 mb-1.5`}

        ${tw`lg:font-size[10px]
        xl:font-size[11px]
        3xl:(font-size[12px])`}
    }

    h3 {
        ${tw`margin[0.8vw 0 0] pr-2 
        font-family[Whyte Inktrap] text-accents-9 tracking-tighter cursor-pointer
        lg:(font-size[18.5px] w-full mr-16 mt-1 mb-4 leading-5)
        xl:font-size[1.45vw]
        3xl:(font-size[23px])`}
    }

    span {
        ${tw`margin-bottom[3vw] font-size[11px] tracking-tighter
        lg:(mb-8 font-size[13px])
        xl:font-size[1.1vw]
        3xl:(font-size[17.5px])`}
    }

    ${(props) =>
        props.onDisplay ? textSizeOnDisplay : textSizeObj[props.textLayout]}
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
    ${tw`flex items-center font-size[12px] cursor-pointer
    lg:(font-size[13px])
    xl:font-size[1.1vw]
    3xl:(font-size[17.5px])`}

    svg {
        ${tw`ml-1 mr-2 font-size[15px]
        xl:font-size[1.2vw]
        3xl:(font-size[21px])`}
    }

    p {
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover p {
        transform: skewX(-10deg);
    }
`;

export const AddToCartBtn = styled(Button)`
    ${tw`padding-top[3.7vw] padding-bottom[3.7vw] margin[4vw 0] border border-accents-1 bg-white capitalize
    text-primary font-size[14px] tracking-tighter
    lg:(my-7 py-7 font-size[15px])
    xl:font-size[1.15vw]
    3xl:(font-size[20px])`}

    box-shadow: 1px 1px 3px rgb(0 0 0 / 14%);
`;
