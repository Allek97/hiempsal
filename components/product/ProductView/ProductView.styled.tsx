import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import tw from "twin.macro";

interface FeatureProps {
    isFirst?: boolean;
}

export const Root = styled.div`
    ${tw`relative padding-bottom[45rem]`}
`;

////////////////////////////////////////////////
// NOTE Product Overview
////////////////////////////////////////////////
const mainTextSize = css`
    ${tw`font-size[18px] tracking-tighter line-height[1.15em]
    lg:(font-size[14px] line-height[1.1em])
    xl:font-size[1.2vw]
    2xl:font-size[18px]`}
`;

const productOverviewDisplay = css`
    ${tw`lg:(grid-template-columns[2fr 1fr] grid-template-rows[34.5% 1fr 34.5%] 
            column-gap[1.3333333333vw] row-gap[0.8vw])
    2xl:(grid-template-columns[5fr 2fr])
    3xl:(grid-template-columns[3fr 1fr])`}
`;

export const ProductOverviewContainer = styled.div`
    ${tw`relative grid grid-cols-2 gap-2.5 w-full 
    min-height[auto] px-0 margin-bottom[16vw]
    md:margin-bottom[8.33333333vw]
    lg:pr-11`}

    ${productOverviewDisplay}
`;

export const ImageContainer = styled.div`
    ${tw`relative w-full h-full text-center`}
`;

export const SliderContainer = styled.div`
    ${tw`grid-column[1/-1] flex items-center justify-center 
    w-full height[calc(100vh - 165px)]
    bg-accents-1 overflow-x-hidden
    sm:(height[calc(100vh - 100px)])
    lg:(min-height[650px] height[calc(100vh - 30px)])`}

    ${tw`lg:grid-area[1/1/-1/2]`}
`;

export const FeatureContainer = styled.div<FeatureProps>`
    ${tw`relative height[52vw] w-full overflow-hidden
    lg:height[100%]`}

    div {
        ${tw`relative w-full h-full bg-accents-8`}
    }

    ${(props) =>
        props.isFirst
            ? css`
                  ${tw`lg:grid-area[1/2/2/-1]`}
              `
            : css`
                  ${tw`lg:grid-area[3/2/-1/-1]`}
              `}
`;

export const CartContainer = styled.div`
    ${tw`flex flex-col grid-column[1/-1] flex-1 
    padding[2vw 4vw 4vw]`}

    ${tw`lg:(grid-area[2/2/3/-1] p-0)`}
`;

export const ProductInfo = styled.header`
    ${tw`flex flex-col margin-bottom[13vw]
    lg:mb-auto`}

    & > div:first-of-type {
        ${tw`flex flex-row space-x-0.5 items-center min-height[1rem] mb-0.5 
        font-size[9.5px] color[#676767] uppercase tracking-tight`}

        span {
            ${tw`leading-none`}

            &:first-of-type,&:last-of-type {
                ${tw`cursor-pointer`}

                transform-origin: center bottom;
                transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
                transition: color 0.3s, transform 0.3s;

                @media (hover: hover) and (pointer: fine) {
                    &:hover {
                        transform-origin: center bottom;
                        transition: transform 0.3s
                            cubic-bezier(0.19, 1, 0.22, 1);
                        transition: color 0.3s, transform 0.3s;
                        transform: skew(-10deg);
                        color: #191919;
                    }
                }
            }

            &:nth-of-type(2) {
                font-size: 11.5px;
            }
        }
    }

    & > div:nth-of-type(2) {
        ${tw`flex flex-row justify-between items-center`}

        ${mainTextSize}

        h1 {
            ${tw`width[80%]`}
        }
    }
`;

export const VariantContainer = styled.div`
    ${tw`flex justify-between items-center height[max-content]`}

    ${mainTextSize}

    & > div:first-of-type {
        ${tw``}
    }
`;

export const VariantButton = styled(Button)`
    ${tw`height[50px] w-full text-white tracking-tighter border-radius[3px]`}
`;

export const WishlistBtn = styled.button`
    ${tw`w-5 margin-left[6vw] mr-3
    lg:(w-6 mr-0 margin-left[1.33333vw])`}
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
            transform: scale(0.9) translateX(2.5%);
        }
    }
`;

////////////////////////////////////////////////
// NOTE Product details
////////////////////////////////////////////////

const bottomMargin = css`
    ${tw`margin-bottom[24vw]
    md:margin-bottom[12vw]
    lg:margin-bottom[8vw]
    4xl:margin-bottom[6vw]`}
`;

export const ProductDetailsBox = styled.div`
    ${tw`flex flex-col
    lg:flex-row`}

    ${({ theme }) => theme.layout.mainPadding}
    ${bottomMargin}
`;

const fontSizeHeader = css`
    ${tw`font-size[25px] line-height[1.3em] tracking-tighter
        lg:(font-size[30px] line-height[1em] letter-spacing[-0.06em])
        2lg:(font-size[2.7vw])`}

    ${tw`2xl:font-size[40px]`}
`;

export const ProductSimilarBox = styled.section`
    ${tw`block`}

    header {
        ${tw`flex flex-col justify-center items-center mb-10 
        lg:margin-bottom[70px]`}

        h1 {
            ${fontSizeHeader}
        }
    }
`;
